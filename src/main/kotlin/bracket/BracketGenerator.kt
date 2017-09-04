package bracket

import kotlin.js.Math

sealed class Tree<out T> {
  abstract val value: T
  abstract var index: Int?

  override fun toString(): String = value.toString()

  data class Node<T>(override var index: Int?, override val value: T, val left: Tree<T>, val right: Tree<T>) : Tree<T>()
  data class Leaf<T>(override var index: Int?, override val value: T) : Tree<T>()
  object Empty : Tree<Nothing>() {
    override val value: Nothing = throw IllegalStateException()
    override var index: Int? = throw IllegalStateException()
    override fun toString(): String = "Tree:Empty"
  }
}

//class TreeNode<T>(value: T) {
//    var value: T = value
//
//    var parent: TreeNode<T>? = null
//
//    var children: MutableList<TreeNode<T>> = mutableListOf()
//
//    fun addLeft(node: TreeNode<T>?) {
//        node?.let {
//            children.add(0, it)
//            it.parent = this
//        }
//        require(children.size <= 2)
//        println("Adicionado left")
//    }
//
//    fun addRight(node: TreeNode<T>?) {
//        node?.let {
//            children.add(1, it)
//            it.parent = this
//        }
//        require(children.size <= 2)
//        println("Adicionado right")
//    }
//
//    override fun toString(): String {
//        var s = "${value}"
//        if (!children.isEmpty()) {
//            s += " {" + children.map { it.toString() } + " }"
//        }
//        return s
//    }
//}

sealed class Partida {
  abstract val equipe1: Equipe ?
  abstract val equipe2: Equipe ?

  data class Finished(override val equipe1: Equipe, override val equipe2: Equipe, val resultado: Resultado) : Partida()
  data class Scheduled(override val equipe1: Equipe, override val equipe2: Equipe) : Partida()
  object Empty : Partida() {
    override val equipe1 = null
    override val equipe2 = null
    override fun toString() = "Partida.Empty"
  }
}

data class Resultado(val time1Pontos: Int, val time2Pontos: Int)
data class Equipe(val nome: String, val codigo: String)
data class Bracket(val root: Tree<Partida>)

@JsName("createBracket")
fun createBracket(timesArray: Array<dynamic>): Bracket {
  require(timesArray.size >= 2)
  val times = timesArray.map { Equipe(it.nome, it.codigo) }.toList()
  val root = when {
    times.size == 2 -> Tree.Leaf(null, Partida.Scheduled(times[0], times[1]))
    else -> {
      val teamsList = times.toMutableList()
      while (teamsList.size % 4 != 0) teamsList.add(Equipe("W.O", "WO-" + Math.random()))
      val levels = (Math.log(teamsList.size.toDouble() / 2) / Math.log(2.0)).toInt() //I.E. if 8 teams, 4 games,  log2 4 = 2.
      buildTree(teamsList.toList().iterator(), 0, levels)
    }
  }

  return assignIndex(Bracket(root))

}

@JsName("assignIndex")
fun assignIndex(bracket: Bracket): Bracket {
  //BFS
  var index = 0
  val queue = mutableListOf<Tree<Partida>>()
  val visited = mutableSetOf<Tree<Partida>>()
  queue.add(bracket.root)
  visited.add(bracket.root)
  while (!queue.isEmpty()) {
    val current = queue.removeAt(0)
    current.index = index
    index += 1
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

  println(bracket.root)
  return bracket
}

@JsName("findMatch")
fun findMatch(bracket: Bracket, index: Int): Tree<Partida>? = findMatch(bracket.root, index)

private fun findMatch(node: Tree<Partida>, index: Int): Tree<Partida>? {
  return with(node) {
    this.index?.let {
      if (it == index) return this
      return when (this) {
        is Tree.Node -> {
          val left = findMatch(left, index)
          val right = findMatch(right, index)
          left ?: right
        }
        else -> null
      }
    }
  }
}

private fun buildTree(iterator: Iterator<Equipe>, index: Int, maxTreeHeight: Int): Tree<Partida> {
  //each height of the three = number of games is 2 ^ index
  //i.e Finals(index = 0) has 1 game (2^0), Semifinals (index: 1 ) has 2 games (2^1).
  println("Index: $index Level: $maxTreeHeight")
  return when {
    index > maxTreeHeight -> Tree.Empty
    index == maxTreeHeight -> Tree.Leaf(null, Partida.Scheduled(iterator.next(), iterator.next()))
    else -> return Tree.Node(null, Partida.Empty,
      buildTree(iterator, index + 1, maxTreeHeight),
      buildTree(iterator, index + 1, maxTreeHeight))
  }
}
