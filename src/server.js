const express = require("express");
const server = express();
const routes = require("./routes");

const nunjucks = require("nunjucks");
nunjucks.configure("src/views/", {
    express: server,
    noCache: true,
});

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.listen(3000);
