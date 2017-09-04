external fun require(module: String): dynamic

fun main(args: Array<String>) {
//    val express = require("express")
//    val app = express()
//    val path  = require("path")
//
//    val fs = require("fs")
//    val __dirname = fs.realpathSync(".")
//    val dirName = js("__dirname")

//
//    app.set("views", path.join(__dirname, "/node/static/"))
//    app.engine("html", require("ejs").renderFile)
//
//    app.get("/times", { req, res ->
//        res.type("text/html")
//        val jsonArray: Array<dynamic> = require("./static/times.json")
//        res.locals.data = jsonArray
//        createBracket(jsonArray.map { Time(it.nome, it.codigo) }.toList())
//        res.render("entidade.html")
//    })
//
//    app.get("/ligas", { req, res ->
//        res.type("text/html")
//        res.locals.data = require("./static/ligas.json")
//        res.render("entidade.html")
//    })
//
//    app.get("/partidas", { req, res ->
//        res.type("text/html")
//        res.locals.data = require("./static/partidas.json")
//        res.render("entidade.html")
//    })
//
//    app.listen(3000, {
//        println("Listening on port 3000")
//    })


  js("process.chdir(__dirname)")
  val dirName = js("__dirname")
  println(dirName)

// Attempt to import `sails`.
  var sails: dynamic
  try {
    sails = require("sails")
  } catch (e: Exception) {
    return
  }

// --•
// Try to get `rc` dependency (for loading `.sailsrc` files).
  var rc: (String) -> Unit = {}
  try {
    rc = require("rc")
  } catch (e: Exception) {
    try {
      rc = require("sails/node_modules/rc")
    } catch (e1: Exception) {
    }
  }


// Start server
  sails.lift(rc("sails"))
}
