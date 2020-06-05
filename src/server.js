const express = require("express")
const server = express()

// get the database
const db = require("./database/db")

// configure public folder
server.use(express.static("public"))


// use template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views/", {
    express: server,
    noCache: true
})




// # routes configures of the application #
// homepage
// req: resquisition
// res: response
server.get('/', (req, res) => {
    return res.render("index.html")
})

server.get('/create-point', (req, res) => {
    return res.render("create-point.html")
})

server.get('/search-results', (req, res) => {

    // get the datas of database
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            console.log(err)
        }

        // shows the HTML page with the datas of database
        return res.render("search-results.html", { places: rows, total: rows.length })
    })
})



// turn on the server
server.listen(3000)
