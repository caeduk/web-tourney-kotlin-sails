package bracket

import kotlin.js.Math

enum class NodePos(val calc: (index: Int) -> Int) {
  //Store BT in array, children of node at index
  LEFT({ (2 * it) + 1 }), //2i + 1 (left)
  RIGHT({ (2 * it) + 2 }), //2i + 2 (right)
  ROOT({ 0 })
}

@JsName("createBracket")
fun createBracket(timesArray: Array<dynamic>): Bracket {
  require(timesArray.size >= 2)
  val times = timesArray.map { Equipe(it.nome, it.codigo) }.toList()
  val teamsList = times.toMutableList()
  val root: Tree<Partida> = when {
    times.size == 2 -> Tree.Leaf(parent = null, index = 0, value = Partida.Empty)
    else -> {
      while (teamsList.size % 4 != 0) teamsList.add(Equipe("WO", "WO-" + Math.random()))
      val levels = (Math.log(teamsList.size.toDouble() / 2) / Math.log(2.0)).toInt() //I.E. if 8 teams, 4 games,  log2 4 = 2.
      buildTree(0, levels, NodePos.ROOT, null)
    }
  }

  val numberOfRounds = (Math.log(teamsList.size.toDouble()) / Math.log(2.0)).toInt() //I.E. 2 ^ 3 = 8 , 8 teams, 3 numberOfRounds
  buildSeeds(0, createSeeds(numberOfRounds).iterator(), teamsList.toList(), root, numberOfRounds)
  return Bracket(root)

}

fun buildSeeds(index: Int, seeds: Iterator<Int>, teamsList: List<Equipe>, node: Tree<Partida>, numberOfRounds: Int) {
  when(node) {
    is Tree.Node -> {
      buildSeeds(index + 1, seeds, teamsList, node.left, numberOfRounds)
      buildSeeds(index + 1, seeds, teamsList, node.right, numberOfRounds)
    }
    is Tree.Leaf -> {
      val seed1 = seeds.next()
      val seed2 = seeds.next()
      //seed is 1-based
      node.value = Partida.Scheduled(teamsList.get(seed1 - 1), seed1, teamsList.get(seed2 - 1), seed2)
    }

  }

}

private fun createSeeds(numberOfRounds: Int): List<Int> {
  var seeds = arrayOf(1, 2)
  for (round in numberOfRounds - 2 downTo 0) { //-2 because first round (final) is already there seeds = [1,2]
    var currentRound: Array<Int> = arrayOf()

    for (match in 0 until seeds.size) {
      var numberOfTeamsInRound = seeds.size * 2
      if (match % 2 == 0) {
        currentRound[match * 2] = seeds[match]
        currentRound[(match * 2) + 1] = numberOfTeamsInRound + 1 - seeds[match]
      } else {
        currentRound[match * 2] = numberOfTeamsInRound + 1 - seeds[match];
        currentRound[(match * 2) + 1] = seeds[match]
      }
    }

    seeds = currentRound;
  }
  return seeds.toList()
}

@JsName("addResultado")
fun addResultado(bracket: Bracket, index: Int, time1Pontos: Int, time2Pontos: Int): Bracket {
  val partidaNode = findMatch(bracket, index)
  partidaNode?.let {
    require(partidaNode.value is Partida.Scheduled)
    val scheduled = partidaNode.value as Partida.Scheduled
    partidaNode.value = Partida.Finished(scheduled.equipe1, scheduled.seed1, scheduled.equipe2, scheduled.seed2, Resultado(time1Pontos, time2Pontos))
    if (partidaNode.parent != null && (partidaNode.parent as Tree.Node).value is Partida.Empty) {
      val parentNode = partidaNode.parent as Tree.Node
      if (parentNode.left.value is Partida.Finished && parentNode.right.value is Partida.Finished) {
        parentNode.value = Partida.Scheduled(
          equipe1 = (parentNode.left.value as Partida.Finished).winnner,
          seed1 = (parentNode.left.value as Partida.Finished).seedWinner,
          equipe2 = (parentNode.right.value as Partida.Finished).winnner,
          seed2 = (parentNode.right.value as Partida.Finished).seedWinner)

      }

    }
  }

  return bracket
}

@JsName("findMatch")
fun findMatch(bracket: Bracket, index: Int): Tree<Partida>? {
  val list = bracket.toList()
  return if (index >= 0 && index < list.size) list[index] else null
}

private fun buildTree(index: Int, maxTreeHeight: Int, pos: NodePos, parentNode: Tree.Node<Partida>?): Tree<Partida> {
  //each height of the three = number of games is 2 ^ index
  //i.e Finals(index = 0) has 1 game (2^0), Semifinals (index: 1 ) has 2 games (2^1).
///  println("Index: $index Level: $maxTreeHeight")
  return when {
    index > maxTreeHeight -> throw IllegalStateException()
    index == maxTreeHeight -> {
      Tree.Leaf(parent = parentNode, index = pos.calc(parentNode?.index ?: 0), value = Partida.Empty)
    }
    else -> {
      val node: Tree.Node<Partida> = Tree.Node(parent = parentNode, index = pos.calc(parentNode?.index ?: 0),
        value = Partida.Empty)

      //Assign left and right late, so we can pass the parentNode via recursion
      node.left = buildTree(index + 1, maxTreeHeight, NodePos.LEFT, node)
      node.right = buildTree(index + 1, maxTreeHeight, NodePos.RIGHT, node)
      node
    }
  }
}
