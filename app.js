const express = require('express');
const mysql = require('mysql');

const app = express();
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'square_yards'
});

con.connect();

app.get('/getname', (req, res) => {
    con.query('SELECT ID FROM TEST', (error, results, fields) => {
        if (error) throw error;
        res.send(results)
    })
})

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => { console.log(`Server Started at port ${PORT}`) });