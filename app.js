const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
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
app.use(cors());
app.use(bodyParser.json());

// Static Declare
app.use(express.static('build'));

// Creating Routes

app.post('/api/builder/publish', (req, res) => {
    const pid = req.body.pid;

    fs.readFile(`./projects/P${pid}.json`, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            res.status = 400;
            res.send({ status: "failed" });
            return;
        } else {
            const project = JSON.parse(data);
            // SQL Queries to store the project in the database
            const sqlProject = `INSERT INTO 'project_info'('pid', 'pname', 'bid', 'location', 'g_img_set', 'type', 'category', 'units', 'amenities_set', 'quality_category') VALUES (${project.pid},[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10])`;

            con.query(sqlProject, (errorProject) => {
                if (errorProject) throw errorProject;

                res.status = 200;
                res.send({ status: "done" });
                return;
            })
        }
    })
})

app.post('/api/builder/save', (req, res) => {
    const pid = req.body.pid;
    const tid = req.body.tid;
    const tower = req.body.tower;
    fs.readFile(`./projects/P${pid}.json`, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            const temp = { pid, towers: [{ tid: tower.tid, tname: tower.tname, floors: tower.floors }] };
            fs.writeFile(`./projects/P${pid}.json`, JSON.stringify(temp), 'utf8', (err) => {
                if (err) {
                    res.status = 400;
                    res.send({ status: "failed" });
                    return;
                } else {
                    res.status = 200;
                    res.send({ status: "done" });
                    return;
                }
            })
        } else {
            const newData = JSON.parse(data);
            let update = false;
            let temp = { tid: tower.tid, tname: tower.tname, floors: tower.floors };
            newData.towers.forEach(t => {
                if (t.tid === tid) {
                    t = data;
                    update = true;
                }
            })
            if (!update) { newData.towers.push(temp) }
            fs.writeFile(`./projects/P${pid}.json`, JSON.stringify(newData), 'utf8', (err) => {
                if (err) {
                    res.status = 400;
                    res.send({ status: "failed" });
                    return;
                } else {
                    res.status = 200;
                    res.send({ status: "done" });
                    return;
                }
            })
        }
    })
})

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

// Initialising Server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => { console.log(`Server Started at port ${PORT}`) });