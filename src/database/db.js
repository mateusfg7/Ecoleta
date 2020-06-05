// import sqlite3 dependence
const sqlite3 = require("sqlite3").verbose();

// create the object that will perform operations on the database
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db

// // use the object of the database, for our operations
// db.serialize(() => {
//     // // create a table with SQL commands:
//     // // the firs param of data is the type of same
//     // // PRIMARY KEY -> main data
//     // // AUTOINCRMENT -> autoincrement when add a new register
//     // db.run(`
//     //         CREATE TABLE IF NOT EXISTS places (
//     //             id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //             image TEXT,
//     //             name TEXT,
//     //             address TEXT,
//     //             address2 TEXT,
//     //             state TEXT,
//     //             city TEXT,
//     //             items TEXT
//     //         );
//     // `);

//     // // insert data into the table with SQL commands
//     // const query = `
//     //     INSERT INTO places (
//     //         image,
//     //         name,
//     //         address,
//     //         address2,
//     //         state,
//     //         city,
//     //         items
//     //     ) VALUES (?,?,?,?,?,?,?);
//     // `
//     // const values = [
//     //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     //     "Papersider",
//     //     "Gulherme Gemballa, Jardim América",
//     //     "Nº 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Papéis e Papelão"
//     // ]

//     // function afterInsertData(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("[personal] Cadastrado com sucesso")
//     //     console.log(this)
//     // }

//     // db.run(query, values, afterInsertData);

//     // // query table data with SQL commands
//     // db.all(`SELECT * FROM  places`, function(err, rows) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("[personal] Aqui estão seus registros")
//     //     console.log(rows)
//     // })
    
//     // // delete a table data with SQL commands
//     // db.run(`DELETE FROM places WHERE id = ?`, [8], function(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }
        
//     //     console.log("[personal] Registro deletado com sucesso")
//     // })
// });
