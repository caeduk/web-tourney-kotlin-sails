package bracket

import kotlin.js.Math

sealed class Tree<T> {
  abstract var value: T
  abstract val index: Int
  abstract val parent: Tree.Node<T>?

  data class Node<T>(override val parent: Node<T>?, override val index: Int, override var value: T) : Tree<T>() {
    lateinit var left: Tree<T> //Hope to improve this someday
    lateinit var right: Tree<T> //Hope to improve this someday
  }

  data class Leaf<T>(override val parent: Node<T>?, override val index: Int, override var value: T) : Tree<T>()
}

val EQUIPE_TBD = Equipe("TBD", "TIME-TBD")

sealed class Partida {
  data class Finished(val equipe1: Equipe, val seed1: Int, val equipe2: Equipe, val seed2: Int,
                      val resultado: Resultado) : Partida() {
    val winnner: Equipe = if (resultado.time1Pontos > resultado.time2Pontos) equipe1 else equipe2
    val seedWinner: Int = if (resultado.time1Pontos > resultado.time2Pontos) seed1 else seed2
  }

  data class Scheduled(val equipe1: Equipe, val seed1: Int, val equipe2: Equipe, val seed2: Int) : Partida()
  object Empty : Partida() {
    val equipe1 = EQUIPE_TBD
    val equipe2 = EQUIPE_TBD
  }
}


data class Resultado(val time1Pontos: Int, val time2Pontos: Int)
data class Equipe(val nome: String, val codigo: String, val id: String) {
  constructor(nome: String, codigo: String) : this(nome, codigo, Math.abs(codigo.hashCode().toDouble()).toString())
}

data class Bracket(var root: Tree<Partida>) : Iterable<Tree<Partida>> {
  override fun iterator(): Iterator<Tree<Partida>> {
    return root.bfs().iterator()
  }
}
