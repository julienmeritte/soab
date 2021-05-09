const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "WKRTE!kE$Cd8*RwC",
    database: "soab",

});

/*app.get('/', (req, res) => {
    res.send('SOAB Backend');
});*/

app.post('/api/insert', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    const sqlInsert = "INSERT INTO test_table (test_name, description) VALUES (?, ?)";
    db.query(sqlInsert, [name, description], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    });
});


app.listen(3001, () => {
    console.log("Running on 3001.");
});