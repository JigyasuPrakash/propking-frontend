const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { error } = require('console');

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
app.get('/api/builder/getproject/:pid', (req, res) => {
    const pid = req.params.pid;
    fs.readFile(`./projects/P${pid}.json`, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            res.status = 400;
            res.send({ status: "failed" });
            return;
        }
        const project = JSON.parse(data);
        res.status = 200;
        res.send(project);
        return;
    })
})

app.post('/api/builder/publish/', (req, res) => {
    const pid = req.body.pid;
    fs.readFile(`./projects/P${pid}.json`, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            res.status = 400;
            res.send({ status: "failed" });
            return;
        } else {
            const project = JSON.parse(data);
            // SQL Queries to store the project in the database
            const sqlProject = `INSERT INTO project_info (pid, pname, bid, location, g_img_set, type, category, units, amenities_set, quality_category) ` +
                `VALUES (${project.pid},'xyz',67890,'Mumbai, India','image urls','residential','flat',0,'pqr','xyz')`;
            con.query(sqlProject, (errorProject) => {
                if (errorProject) {
                    res.status = 400;
                    res.send({ status: "failed" });
                    console.error("Project: ", errorProject);
                    return;
                };

                let sqlTower = 'INSERT INTO apartment_tower_info (tid, pid, tname, no_of_floors, g_img_set, units) VALUES ';
                let myTower = [];
                project.towers.forEach(t => {
                    myTower.push(`('${t.tid}', ${pid}, '${t.tname}', ${t.floors.length}, 'null', 0)`);
                })
                sqlTower += myTower.join(',') + ';';
                con.query(sqlTower, (errorTower) => {
                    if (errorTower) {
                        res.status = 400;
                        res.send({ status: "failed" });
                        console.error("Tower: ", errorTower);
                        return;
                    };

                    let sqlFloor = 'INSERT INTO apartment_floor_info (fid, tid, pid, floor_no, units, g_img_set) VALUES ';
                    let myFloor = [];
                    project.towers.forEach(t => {
                        t.floors.forEach(f => {
                            myFloor.push(`('${f.fid}', '${t.tid}', ${pid}, ${f.floor_no}, 0, 'null')`);
                        })
                    })
                    sqlFloor += myFloor.join(',') + ';';

                    con.query(sqlFloor, (errorFloor) => {
                        if (errorFloor) {
                            res.status = 400;
                            res.send({ status: "failed" });
                            console.error("Floor: ", errorFloor);
                            return;
                        };

                        let sqlUnit = 'INSERT INTO apartment_unit_info (uid, fid, tid, pid, unit_no, bhk_type, status, g_img_set, tags_set, no_of_balconies, facing, size) VALUES ';
                        let myUnit = [];
                        project.towers.forEach(t => {
                            t.floors.forEach(f => {
                                f.units.forEach(u => {
                                    myUnit.push(`('${u.uid}', '${f.fid}', '${t.tid}', ${pid}, '${u.unit_no}', ${u.bhk_type}, 'available', 'null', 'null', 1, '${u.facing}', ${u.size}) `);
                                })
                            })
                        })
                        sqlUnit += myUnit.join(',') + ';';

                        con.query(sqlUnit, (errorUnit) => {
                            if (errorUnit) {
                                res.status = 400;
                                res.send({ status: "failed" });
                                console.error("unit: ", errorUnit);
                                return;
                            };

                            let sqlUnitInfo = `INSERT INTO unit_info (id, pid, bhk, area, unit) VALUES `;
                            let myInfo = [];
                            project.unitInfo.forEach(info => {
                                myInfo.push(`(${info.key}, ${pid}, ${info.bhk}, ${info.area}, 'Sq.Ft.')`)
                            })
                            sqlUnitInfo += myInfo.join(',') + ';';

                            con.query(sqlUnitInfo, (errorInfo) => {
                                if (errorInfo) {
                                    res.status = 400;
                                    res.send({ status: "failed" });
                                    console.error("UnitInfo: ", errorInfo)
                                    return;
                                }

                                res.status = 200;
                                res.send({ status: "done" });
                                return;
                            })
                        })
                    })
                })
            })
        }
    })
})

app.post('/api/builder/save', (req, res) => {
    const pid = req.body.pid;
    const towers = req.body.towers;
    const unitInfo = req.body.unitInfo;
    const uniqueAtt = req.body.uniqueAtt;
    const facing = req.body.facing;

    const temp = { pid, towers, unitInfo, uniqueAtt, facing };
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
});

app.get('/api/getproject/:id', (req, res) => {
    const id = req.params.id;
    let sqlProject = `SELECT * FROM PROJECT_INFO WHERE PID = ${id};`;
    let sqlTower = `SELECT tid, tname FROM APARTMENT_TOWER_INFO WHERE PID = ${id};`;
    let sqlFloor = `SELECT fid, floor_no, tid, pid FROM APARTMENT_FLOOR_INFO WHERE PID = ${id};`;
    let sqlUnit = `SELECT * FROM APARTMENT_UNIT_INFO WHERE PID = ${id};`;
    let sqlUnitInfo = `SELECT * FROM UNIT_INFO WHERE PID = ${id}`;
    let answer = {
        id: '',
        name: '',
        location: '',
        img_set: '',
        towers: [],
        unitInfo: []
    }
    con.query(sqlProject, (errorProject, resultProject) => {
        if (errorProject || (resultProject.length === 0)) {
            res.status = 400;
            res.send({ status: "failed" });
            console.error("Project: ", errorProject);
            return;
        };
        answer.id = resultProject[0].pid;
        answer.name = resultProject[0].pname;
        answer.location = resultProject[0].location;
        answer.img_set = resultProject[0].g_img_set;

        con.query(sqlUnitInfo, (errorUnitInfo, resultUnitInfo) => {
            if (errorUnitInfo || (resultUnitInfo.length === 0)) {
                res.status = 400;
                res.send({ status: "failed" });
                console.error("UnitInfo: ", errorUnitInfo);
                return;
            };
            answer.unitInfo = resultUnitInfo;

            con.query(sqlTower, (errorTower, resultTower) => {
                if (errorTower || (resultTower.length === 0)) {
                    res.status = 400;
                    res.send({ status: "failed" });
                    console.error("Tower: ", errorTower);
                    return;
                };
                answer.towers = resultTower

                con.query(sqlFloor, (errorFloor, resultFloor) => {
                    if (errorFloor || resultFloor.length === 0) {
                        res.status = 400;
                        res.send({ status: "failed" });
                        console.error("Floor", errorFloor);
                        return;
                    };

                    con.query(sqlUnit, (errorUnit, resultUnit) => {
                        if (errorUnit || (resultUnit.length === 0)) {
                            res.status = 400;
                            res.send({ status: "failed" });
                            console.error("Unit: ", errorUnit);
                            return;
                        };

                        answer.towers.forEach(t => {
                            t.floors = []
                            resultFloor.forEach(f => {
                                if (t.tid === f.tid) {
                                    f.units = []
                                    resultUnit.forEach(u => {
                                        if (u.fid === f.fid) {
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