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
app.use(express.static('build'));

// Creating Routes
app.get('/api/getproject/:id', (req, res) => {
    const id = req.params.id;
    let sqlProject = `SELECT * FROM PROJECT_INFO WHERE PID = ${id};`;
    let sqlTower = `SELECT TID, NAME FROM APARTMENT_TOWER_INFO WHERE PID = ${id};`;
    let sqlFloor = `SELECT FID, FLOOR_NO, TID, PID FROM APARTMENT_FLOOR_INFO WHERE PID = ${id};`;
    let sqlUnit = `SELECT * FROM APARTMENT_UNIT_INFO WHERE PID = ${id};`;
    let sqlUnitInfo = `SELECT * FROM UNIT_INFO WHERE PID = ${id}`;
    let answer = {
        id: '',
        name: '',
        location: '',
        logo: '',
        tower: [],
        unitInfo: []
    }
    con.query(sqlProject, (errorProject, resultProject, fieldProject) => {
        if (errorProject) throw errorProject;
        answer.id = resultProject[0].pid;
        answer.name = resultProject[0].pname;
        answer.location = resultProject[0].location;
        answer.logo = resultProject[0].g_img_set;

        con.query(sqlUnitInfo, (errorUnitInfo, resultUnitInfo, filedsUnitInfo) => {
            if (errorUnitInfo) throw errorUnitInfo;
            answer.unitInfo = resultUnitInfo;

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
})

// Starting Server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => { console.log(`Server Started at port ${PORT}`) });