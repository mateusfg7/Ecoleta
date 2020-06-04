const express = require("express")
const server = express()

// configure public folder
server.use(express.static("public"))

// # routes configures of the application #
// homepage
// req: resquisition
// res: response
server.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get('/create-point', (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})



// turn on the server
server.listen(3000)