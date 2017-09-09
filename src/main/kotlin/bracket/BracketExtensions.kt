package bracket

import kotlin.js.Math

@JsName("prettyPrintForGracket")
fun prettyPrint(bracket: Bracket): String {
  val finalList = mutableListOf<Array<Array<EquipeScore>>>()

  val list = bracket.root.bfs()

  //Finals are index 0 (root of tree), so reverse it, we want this in order
  val reversed = list.reversed()

  val numberOfTeams = reversed.size + 1
  val iterator = reversed.iterator()
  val rounds = (Math.log(numberOfTeams.toDouble()) / Math.log(2.0)).toInt() //I.E. 2 ^ 3 = 8 , 8 teams, 3 rounds
  var numberOfMatches = numberOfTeams / 2
  for (counter in 0 until rounds) {
    val tempList = mutableListOf<Array<EquipeScore>>()
    for (i in 0 until numberOfMatches) {
      val elements = iterator.next().value
      val array = when(elements) {
        is Partida.Finished -> elements.equipeResult()
        is Partida.Scheduled -> elements.equipeResult()
        Partida.Empty -> Partida.Empty.equipeResult()
      }
      tempList.add(array)
    }

    finalList.add(tempList.reversed().toTypedArray())
    numberOfMatches /= 2 //single elimination bracket, number of matches per round decreases in half

    if (counter + 1 == rounds) { //Final match, check winner
      val final = list.iterator().next().value
      when (final) {
        is Partida.Finished -> finalList.add(arrayOf(arrayOf(EquipeScore(final.winnner, null))))
        else -> finalList.add(arrayOf(arrayOf(EquipeScore(EQUIPE_TBD,null))))
      }
    }
  }

  return JSON.stringify(finalList.toTypedArray())
}

fun <T> Tree<T>.bfs(): List<Tree<T>> {
  val queue = mutableListOf<Tree<T>>()
  val list = mutableListOf<Tree<T>>()
  queue.add(this)

  while (!queue.isEmpty()) {
    val current = queue.removeAt(0)
    list.add(current)
    when (current) {
      is Tree.Node -> {
        queue.add(current.left)
        queue.add(current.right)
      }
    }
  }
  return list.toList()
}
@JsName("printTree")
fun printTree(bracket: Bracket) {
  val action: (Tree<Partida>) -> Unit = { println("Index: " + it.index + " Partida: " + it.value) }
  bracket.forEach(action)
}

data class EquipeScore(val nome: String, val codigo: String, val id: String, val score:Int?, val seed: Int ?) {
  constructor(equipe: Equipe, score: Int? = null, seed: Int ? = null) :
    this(equipe.nome, equipe.codigo, Math.abs(equipe.codigo.hashCode().toDouble()).toString(), score, seed)

}
fun Partida.Finished.equipeResult(): Array<EquipeScore> {
  return arrayOf(EquipeScore(equipe1, resultado.time1Pontos, seed1), EquipeScore(equipe2, resultado.time2Pontos, seed2))
}
fun Partida.Scheduled.equipeResult(): Array<EquipeScore> {
  return arrayOf(EquipeScore(equipe = equipe1, seed = seed1), EquipeScore(equipe = equipe2, seed = seed2))
}
fun Partida.Empty.equipeResult(): Array<EquipeScore> {
  return arrayOf(EquipeScore(equipe = equipe1), EquipeScore(equipe = equipe2))
}
