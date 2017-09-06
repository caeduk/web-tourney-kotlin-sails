package bracket

import kotlin.js.Math

sealed class Tree<T>(var parent: Tree<T>? = null) : Iterable<T> {
  abstract val value: T
  abstract var index: Int

  override fun iterator(): Iterator<T> {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  data class Node<T>(override var index: Int, override val value: T, var left: Tree<T>, var right: Tree<T>) : Tree<T>() {
    init {
      left.parent = this
      left.index = NodePos.LEFT.calc(index)
      right.parent = this
      right.index = NodePos.RIGHT.calc(index)
    }
  }

  //Parent Node will calculate each children's index
  data class Leaf<T>(override var index: Int = -1, override val value: T) : Tree<T>()
}

sealed class Partida {
  abstract val equipe1: Equipe
  abstract val equipe2: Equipe

  data class Finished(override val equipe1: Equipe, override val equipe2: Equipe, val resultado: Resultado) : Partida() {
    val winnner: Equipe = if (resultado.time1Pontos > resultado.time2Pontos) equipe1 else equipe2
    override fun toString(): String {
      return "Finished(equipe1=$equipe1, equipe2=$equipe2, resultado=$resultado, winnner=$winnner)"
    }

  }

  data class Scheduled(override val equipe1: Equipe, override val equipe2: Equipe) : Partida()
  object Empty : Partida() {
    override val equipe1 = Equipe.TBD
    override val equipe2 = Equipe.TBD
  }
}

data class Resultado(val time1Pontos: Int, val time2Pontos: Int)
open class Equipe(val nome: String, val codigo: String) {
  object TBD : Equipe("B.Y.E", "TIME-BYE")
}

data class Bracket(var root: Tree<Partida>)

@JsName("createBracket")
fun createBracket(timesArray: Array<dynamic>): Bracket {
  require(timesArray.size >= 2)
  val times = timesArray.map { Equipe(it.nome, it.codigo) }.toList()
  val root: Tree<Partida> = when {
    times.size == 2 -> Tree.Leaf(0, Partida.Scheduled(times[0], times[1]))
    else -> {
      val teamsList = times.toMutableList()
      while (teamsList.size % 4 != 0) teamsList.add(Equipe("W.O", "WO-" + Math.random()))
      val levels = (Math.log(teamsList.size.toDouble() / 2) / Math.log(2.0)).toInt() //I.E. if 8 teams, 4 games,  log2 4 = 2.
      buildTree(teamsList.toList().iterator(), 0, levels, NodePos.ROOT)
    }
  }

  return Bracket(root)

}

//@JsName("assignIndex")
//fun assignIndex(bracket: Bracket): Bracket {
//  //BFS
//  var index = 0
//  val queue = mutableListOf<Tree<Partida>>()
//  val visited = mutableSetOf<Tree<Partida>>()
//  queue.add(bracket.root)
//  visited.add(bracket.root)
//
//  while (!queue.isEmpty()) {
//    val current = queue.removeAt(0)
//    current.index = index
//    println("Index: $index but parent is index: " + current.parent?.index)
//    index += 1
//    when (current) {
//      is Tree.Node -> {
//        if (!visited.contains(current.left)) {
//          queue.add(current.left)
//          visited.add(current.left)
//        }
//        if (!visited.contains(current.right)) {
//          queue.add(current.right)
//          visited.add(current.right)
//        }
//      }
//    }
//
//  }
//
//  println(bracket.root)
//  return bracket
//}


@JsName("addResultado")
fun addResultado(bracket: Bracket, index: Int, time1Pontos: Int, time2Pontos: Int): Bracket {
  val partidaNode = findMatch(bracket, index)
  partidaNode?.let {
    val partida = partidaNode.value as Partida.Scheduled
    val finished = Partida.Finished(partida.equipe1, partida.equipe2, Resultado(time1Pontos, time2Pontos))
    val newNode = when (partidaNode) {
      is Tree.Node -> partidaNode.copy(value = finished)
      is Tree.Leaf -> partidaNode.copy(value = finished)
    }

    newNode.parent = partidaNode.parent
    if (newNode.parent != null) {
      val parent = newNode.parent as Tree.Node
      when {
        parent.left.index == newNode.index -> parent.left = newNode
        parent.right.index == newNode.index -> parent.right = newNode
        else -> throw IllegalStateException()
      }

    } else {
      bracket.root = newNode
    }

  }

  println(bracket.root)
  return bracket
}

@JsName("findMatch")
fun findMatch(bracket: Bracket, index: Int): Tree<Partida>? = findMatch(bracket.root, index)

private fun findMatch(node: Tree<Partida>, index: Int): Tree<Partida>?
  = with(node) {
    if (this.index == index) return this
    return when (this) {
      is Tree.Node -> {
        val left = findMatch(left, index)
        val right = findMatch(right, index)
        left ?: right
      }
      else -> null
    }
}

enum class NodePos(val calc: (index: Int) -> Int) {
  //Store BT in array, children of node at index
  LEFT({(2 * it) + 1}),  //2i + 1 (left)
  RIGHT({(2 * it) + 2}),  //2i + 2 (right)
  ROOT({ 0 })
}

private fun buildTree(iterator: Iterator<Equipe>, index: Int, maxTreeHeight: Int, pos: NodePos): Tree<Partida> {
  //each height of the three = number of games is 2 ^ index
  //i.e Finals(index = 0) has 1 game (2^0), Semifinals (index: 1 ) has 2 games (2^1).
//  println("Index: $index Level: $maxTreeHeight")
  return when {
    index > maxTreeHeight -> throw IllegalStateException()
    index == maxTreeHeight -> Tree.Leaf(value = Partida.Scheduled(iterator.next(), iterator.next()))
    else -> return Tree.Node(pos.calc(index - 1), Partida.Empty,
      buildTree(iterator, index + 1, maxTreeHeight, NodePos.LEFT),
      buildTree(iterator, index + 1, maxTreeHeight, NodePos.RIGHT))
  }
}
