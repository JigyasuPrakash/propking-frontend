const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Configuring Server
const app = express();
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'square_yards'
});
con.connect(() => { console.log("Database Connected") });
app.use(cors())

// Static Declare
app.use(express.static(__dirname + '/build'));

// Creating Routes
app.get('/getproject/:id', (req, res) => {
    const id = req.params.id;
    let sqlProject = `SELECT * FROM PROJECT_INFO WHERE PID = ${id};`;
    let sqlTower = `SELECT TID, NAME FROM APARTMENT_TOWER_INFO WHERE PID = ${id};`;
    let sqlFloor = `SELECT FID, FLOOR_NO, TID, PID FROM APARTMENT_FLOOR_INFO WHERE PID = ${id};`;
    let sqlUnit = `SELECT * FROM APARTMENT_UNIT_INFO WHERE PID = ${id};`;
    let answer = {
        id: '',
        name: '',
        location: '',
        tower: [],
        unitInfo: [
            { id: 1, bhk: 2, area: 695, unit: "Sq.Ft.", available: 41 },
            { id: 2, bhk: 2, area: 699, unit: "Sq.Ft.", available: 66 },
            { id: 3, bhk: 2, area: 711, unit: "Sq.Ft.", available: 63 },
            { id: 4, bhk: 2, area: 825, unit: "Sq.Ft.", available: 26 },
            { id: 5, bhk: 3, area: 1108, unit: "Sq.Ft.", available: 56 }
        ]
    }
    con.query(sqlProject, (errorProject, resultProject, fieldProject) => {
        if (errorProject) throw errorProject;
        answer.id = resultProject[0].pid;
        answer.name = resultProject[0].pname;
        answer.location = resultProject[0].location;

        con.query(sqlTower, (errorTower, resultTower, filedsTower) => {
            if (errorTower) throw errorTower;
            answer.tower = resultTower

            con.query(sqlFloor, (errorFloor, resultFloor, fieldFloor) => {
                if (errorFloor) throw errorFloor;

                con.query(sqlUnit, (errorUnit, resultUnit, filedsUnit) => {
                    if (errorUnit) throw errorUnit;

                    answer.tower.forEach(t => {
                        t.floors = []
                        resultFloor.forEach(f => {
                            if (t.TID === f.TID) {
                                f.units = []
                                resultUnit.forEach(u => {
                                    if (u.fid === f.FID) {
                                        f.units.push(u)
                                    }
                                })
                                t.floors.push(f);
                            }
                        })
                    })

                    res.send(answer);
                })
            })
        })
    })
})

// Starting Server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => { console.log(`Server Started at port ${PORT}`) });