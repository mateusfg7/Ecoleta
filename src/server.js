const express = require("express");
const server = express();
const routes = require('./routes')

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views/", {
    express: server,
    noCache: true,
});

server.use(routes)

server.listen(3000);
