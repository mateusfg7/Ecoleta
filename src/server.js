const express = require("express")
const server = express()

// # routes configures of the application #
// homepage
// req: resquisition
// res: response
server.get('/', (req, res) => {
    res.send("Hello Word!")
})



// turn on the server
server.listen(3000)