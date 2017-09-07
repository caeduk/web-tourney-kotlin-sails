package bracket

import kotlin.js.Math

sealed class Tree<T> {
  abstract val value: T
  abstract val index: Int
  abstract val parent: Tree.Node<T>?

  data class Node<T>(override val parent: Node<T>?, override val index: Int, override val value: T) : Tree<T>() {
    lateinit var left: Tree<T> //Hope to improve this someday
    lateinit var right: Tree<T> //Hope to improve this someday
    init {
//      println("Node: $index , leftChild: " + left.index + " rightChild: " + right.index)
    }

    fun fullCopy(newValue: T) : Node<T> {
      val oldRef: Node<T> = this
      return copy(value = newValue).apply {
        left = oldRef.left
        right = oldRef.right
      }
    }
  }

  data class Leaf<T>(override val parent: Node<T>?, override val index: Int, override val value: T) : Tree<T>() {
    init {
//      println("Leaf: $index")
    }
  }

}

sealed class Partida {
  data class Winner(val equipe1: Equipe) : Partida()
  data class Finished(val equipe1: Equipe, val equipe2: Equipe, val resultado: Resultado) : Partida() {
    val winnner: Equipe = if (resultado.time1Pontos > resultado.time2Pontos) equipe1 else equipe2
    override fun toString(): String {
      return "Finished(equipe1=$equipe1, equipe2=$equipe2, resultado=$resultado, winnner=$winnner)"
    }

  }

  data class Scheduled(val equipe1: Equipe, val equipe2: Equipe) : Partida()
  object Empty : Partida() {
    val equipe1 = EQUIPE_TBD
    val equipe2 = EQUIPE_TBD
  }
}

val EQUIPE_TBD = Equipe("TBD", "TIME-TBD")

data class Resultado(val time1Pontos: Int, val time2Pontos: Int)
data class Equipe(val nome: String, val codigo: String, val ID: String) {
    constructor(nome: String, codigo: String) : this(nome, codigo, Math.abs(codigo.hashCode().toDouble()).toString())
}

data class Bracket(var root: Tree<Partida>) : Iterable<Tree<Partida>> {
  override fun iterator(): Iterator<Tree<Partida>> {
    return object : Iterator<Tree<Partida>> {
      val iterator = bfs(root).iterator()
      override fun hasNext(): Boolean {
        return iterator.hasNext()
      }

      override fun next(): Tree<Partida> {
        return iterator.next()
      }
    }
  }

  @JsName("prettyPrint")
  fun prettyPrint(): String {
    val finalList = mutableListOf<Array<Partida>>()

    //Finals are index 0 (root of tree), so reverse it
    val list = bfs(root).reversed()

    val numberOfTeams = list.size + 1
    val iterator = list.iterator()
    val rounds = (Math.log(numberOfTeams.toDouble() ) / Math.log(2.0)).toInt() //I.E. if 8 teams, 4 games,  log2 4 = 2.
    var numberOfMatches = numberOfTeams / 2
    for (counter in 0 until rounds) {
      val tempList = mutableListOf<Partida>()
      for (i in 0 until numberOfMatches) {
        tempList.add(iterator.next().value)
      }

      finalList.add(tempList.toTypedArray())
      numberOfMatches /= 2

      if (counter + 1 == rounds) { //Final match, check winner
        val final = tempList[0]
        when(final) {
          is Partida.Finished -> finalList.add(arrayOf(Partida.Winner(final.winnner)))
          else -> finalList.add(arrayOf(Partida.Winner(EQUIPE_TBD)))
        }
      }
    }

    return JSON.stringify(finalList.toTypedArray())
  }
}

fun <T> bfs(root: Tree<T>): List<Tree<T>> {
  val queue = mutableListOf<Tree<T>>()
  val visited = mutableSetOf<Tree<T>>()
  val list = mutableListOf<Tree<T>>()
  queue.add(root)
  visited.add(root)

  while (!queue.isEmpty()) {
    val current = queue.removeAt(0)
    list.add(current)
    when (current) {
      is Tree.Node -> {
        if (!visited.contains(current.left)) {
          queue.add(current.left)
          visited.add(current.left)
        }
        if (!visited.contains(current.right)) {
          queue.add(current.right)
          visited.add(current.right)
        }
      }
    }
  }
  return list.toList()
}

@JsName("createBracket")
fun createBracket(timesArray: Array<dynamic>): Bracket {
  require(timesArray.size >= 2)
  val times = timesArray.map { Equipe(it.nome, it.codigo) }.toList()
  val root: Tree<Partida> = when {
    times.size == 2 -> Tree.Leaf(parent = null, index =  0, value = Partida.Scheduled(times[0], times[1]))
    else -> {
      val teamsList = times.toMutableList()
      while (teamsList.size % 4 != 0) teamsList.add(Equipe("WO", "WO-" + Math.random()))
      val levels = (Math.log(teamsList.size.toDouble() / 2) / Math.log(2.0)).toInt() //I.E. if 8 teams, 4 games,  log2 4 = 2.
      buildTree(teamsList.toList().iterator(), 0, levels, NodePos.ROOT, null)
    }
  }

  return Bracket(root)

}

@JsName("addResultado")
fun addResultado(bracket: Bracket, index: Int, time1Pontos: Int, time2Pontos: Int): Bracket {
  val partidaNode = findMatch(bracket, index)
  partidaNode?.let {
    require(partidaNode.value is Partida.Scheduled)
    val partida = partidaNode.value as Partida.Scheduled
    val finished = Partida.Finished(partida.equipe1, partida.equipe2, Resultado(time1Pontos, time2Pontos))
    val newNode = when (partidaNode) {
      is Tree.Node -> partidaNode.fullCopy(finished)
      is Tree.Leaf -> partidaNode.copy(value = finished)
    }

    if (newNode.parent != null) {
      val parent = newNode.parent as Tree.Node
      when {
        parent.left.index == newNode.index -> parent.left = newNode
        parent.right.index == newNode.index -> parent.right = newNode
        else -> throw IllegalStateException()
      }

      if (parent.value is Partida.Empty) {
        val oldParent = parent
        if (oldParent.left.value is Partida.Finished && oldParent.right.value is Partida.Finished) {
          val newPartida = Partida.Scheduled(equipe1 = (oldParent.right.value as Partida.Finished).winnner,
            equipe2 = (oldParent.left.value as Partida.Finished).winnner)

          val newParent = oldParent.fullCopy(newPartida)

          if (newParent.parent != null) {
            val topNode = newParent.parent
            with(topNode) {
              when {
                left.index == newParent.index -> left = newParent
                right.index == newParent.index -> right = newParent
                else -> throw IllegalStateException()
              }
            }
          } else {
            bracket.root = newParent
          }

        }

      }

    } else {
      bracket.root = newNode
    }

  }

  return bracket
}

@JsName("printTree")
fun printTree(bracket: Bracket) {
  val action: (Tree<Partida>) -> Unit = { println("Index: " + it.index + " Partida: " + it.value) }
  bracket.forEach(action)
}


@JsName("findMatch")
fun findMatch(bracket: Bracket, index: Int): Tree<Partida> ? {
  val list = bracket.toList()
  return if (index >= 0 && index < list.size) list[index] else null
}

enum class NodePos(val calc: (index: Int) -> Int) {
  //Store BT in array, children of node at index
  LEFT({ (2 * it) + 1 }), //2i + 1 (left)
  RIGHT({ (2 * it) + 2 }), //2i + 2 (right)
  ROOT({ 0 })
}

private fun buildTree(iterator: Iterator<Equipe>, index: Int, maxTreeHeight: Int, pos: NodePos,
                      parentNode: Tree.Node<Partida> ?): Tree<Partida> {
  //each height of the three = number of games is 2 ^ index
  //i.e Finals(index = 0) has 1 game (2^0), Semifinals (index: 1 ) has 2 games (2^1).
///  println("Index: $index Level: $maxTreeHeight")
  return when {
    index > maxTreeHeight -> throw IllegalStateException()
    index == maxTreeHeight -> {
      Tree.Leaf(parent = parentNode, index = pos.calc(parentNode?.index ?: 0),
        value = Partida.Scheduled(iterator.next(), iterator.next()))
    }
    else -> {
      val node: Tree.Node<Partida> = Tree.Node(parent = parentNode, index = pos.calc(parentNode?.index ?: 0), value = Partida.Empty)

      //Assign left and right late, so we can pass the parentNode via recursion
      node.left = buildTree(iterator, index + 1, maxTreeHeight, NodePos.LEFT, node)
      node.right = buildTree(iterator, index + 1, maxTreeHeight, NodePos.RIGHT, node)
      node
    }
  }
}
