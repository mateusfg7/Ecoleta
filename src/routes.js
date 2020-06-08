const showAndSaveLog = require("./log/log")
const now = () => {
    const dateClass = new Date
    const date_hour = `${dateClass.getDay()}/${dateClass.getMonth()}/${dateClass.getFullYear()}-${dateClass.getHours()}:${dateClass.getMinutes()}:${dateClass.getSeconds()}`
    return date_hour
}

const db = require("./database/db");


const express = require('express')
const routes = express.Router()


routes.get("/", (req, res) => {
    showAndSaveLog('rendering index.html', now())
    return res.render("index.html");
});

routes.get("/create-point", (req, res) => {
    showAndSaveLog('rendering create-point.html', now())
    return res.render("create-point.html");
});

routes.post("/savepoint", (req, res) => {
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
    
    showAndSaveLog('registering point', now())
    db.run(query, values, function (err) {
        if (err) {
            showAndSaveLog('error when registering point', now())
            console.log(err);
            return res.send("Erro no cadastro");
        }

        showAndSaveLog('data registered in database', now())
        showAndSaveLog('rendering create-point.html', now())
        return res.render("create-point.html", { saved: true });
    });
});

routes.get("/search-results", (req, res) => {
    const search = req.query.search;

    if (search == "") {
        // empity search
        showAndSaveLog('rendering search-results.html', now())
        return res.render("search-results.html", { total: 0 });
    }

    // get the datas of database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err);
        }

        // shows the HTML page with the datas of database
        showAndSaveLog('rendering search-results.html', now())
        return res.render("search-results.html", {
            places: rows,
            total: rows.length,
        });
    });
});

module.exports = routes
