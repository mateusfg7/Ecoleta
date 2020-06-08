const showAndSaveLog = require("./log/log")
const dateClass = new Date
const date_hour = `${dateClass.getDay()}/${dateClass.getMonth()}/${dateClass.getFullYear()}-${dateClass.getHours()}:${dateClass.getMinutes()}:${dateClass.getSeconds()}`

const express = require("express");
const server = express();

// get the database
const db = require("./database/db");

// configure public folder
server.use(express.static("public"));

// able the use of req.body
server.use(express.urlencoded({ extended: true }));

// use template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views/", {
    express: server,
    noCache: true,
});

// # routes configures of the application #
// homepage
// req: resquisition
// res: response
server.get("/", (req, res) => {
    showAndSaveLog('rendering index.html', date_hour)
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {
    // query strings
    // console.log(req.query)
    showAndSaveLog('rendering create-point.html', date_hour)
    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
    // req.body
    // console.log(req.body)

    // insert data on the database
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ];
    
    showAndSaveLog('registering point', date_hour)
    db.run(query, values, function (err) {
        if (err) {
            showAndSaveLog('error when registering point', date_hour)
            console.log(err);
            return res.send("Erro no cadastro");
        }

        showAndSaveLog('data registered in database', date_hour)
        console.log(this);

        showAndSaveLog('rendering create-point.html', date_hour)
        return res.render("create-point.html", { saved: true });
    });
});

server.get("/search-results", (req, res) => {
    const search = req.query.search;

    if (search == "") {
        // empity search
        showAndSaveLog('rendering search-results.html', date_hour)
        return res.render("search-results.html", { total: 0 });
    }

    // get the datas of database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err);
        }

        // shows the HTML page with the datas of database
        showAndSaveLog('rendering search-results.html', date_hour)
        return res.render("search-results.html", {
            places: rows,
            total: rows.length,
        });
    });
});

// turn on the server
server.listen(3000);
