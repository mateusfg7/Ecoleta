const express = require("express")
const server = express()

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



// turn on the server
server.listen(3000)