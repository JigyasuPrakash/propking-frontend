import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import RowSelect from './RowSelect';
import ColumnSelect from './ColumnSelect';
import Grid from '@material-ui/core/Grid';
import GenerateOptions from './GenerateOptions';
import GenerateCell from './GenerateCell';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import TowerRename from './TowerRename';

function GenerateMatrix({ towers, unitInfo, uniqueAtt, facing, save, preview }) {

    const [project, setProject] = React.useState(towers);
    const handleProjectUpdate = (newTower) => {
        let newData = project;
        newData.forEach(t => {
            if (t.tid === newTower.tid) {
                newData[newData.indexOf(t)] = newTower;
            }
        })
        setProject(newData);
    }

    const [page, setPage] = React.useState(1);
    const handlePage = (event, page) => {
        if (project !== undefined) {
            updateTower(project[page - 1]);
            setPage(page);
        }
    }

    const [myTower, setTower] = React.useState(project[0]);
    const updateTower = (newTower) => {
        setTower(newTower);
        handleProjectUpdate(newTower)
    }

    const getUnit = (unit) => {
        if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
            // Selected Units
            let color = ""
            unit.status ? (color = "grey") : (color = "black");
            return (<GenerateCell
                unit={unit}
                variant="contained"
                filter={handleIndividual}
                color={color}
                disable={handleDisabled}
                rename={rename}
                applyDisable={applyDisable} />);
        } else {
            let color = ""
            unit.status ? (color = "grey") : (color = "red");
            return (<GenerateCell
                unit={unit}
                variant="outlined"
                filter={handleIndividual}
                color={color}
                disable={handleDisabled}
                rename={rename}
                applyDisable={applyDisable} />);
        }
    };

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [rowSelect, setRowSelect] = React.useState([]);
    const handleRowSelect = (info, state) => {
        let data = rowSelect;
        // Selecting row (T1F1)
        let myInfo = myTower.floors[0].units.map(u => info + 'U' + u.uid.split('U')[1]);
        if (state) {
            myInfo.forEach(u => {
                if (data.includes(u)) {
                    data = data.filter(a => { return a !== u });
                } else {
                    data.push(u);
                }
            })
        } else {
            myInfo.forEach(u => {
                data = data.filter(a => { return a !== u });
            })
        }
        forceUpdate();
        setRowSelect(data);
    }

    const [colSelect, setColSelect] = React.useState([]);
    const handleColumnSelect = (info, state) => {
        let data = colSelect;
        // Selecting Column (U1)
        let myInfo = myTower.floors.map(f => f.fid + info);
        if (state) {
            myInfo.forEach(u => {
                if (data.includes(u)) {
                    data = data.filter(a => { return a !== u });
                } else {
                    data.push(u);
                }
            })
        } else {
            myInfo.forEach(u => {
                data = data.filter(a => { return a !== u });
            })
        }
        forceUpdate();
        setColSelect(data);
    }

    const handleIndividual = (info) => {
        let rowData = rowSelect;
        let colData = colSelect;
        if (rowData.includes(info) || colData.includes(info)) {
            rowData = rowData.filter(a => { return a !== info });
            colData = colData.filter(a => { return a !== info });
        } else {
            rowData.push(info);
            colData.push(info);
        }
        forceUpdate();
        setRowSelect(rowData);
        setColSelect(colData);
    }

    const [disabled, setDisabled] = React.useState([]);
    const handleDisabled = (info) => {
        let data = disabled;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info });
        } else {
            data.push(info);
            forceUpdate();
        }
        setDisabled(data);
        applyDisable(data);
    }

    const applyDisable = (data) => {
        let floors = []
        myTower.floors.forEach(floor => {
            let units = []
            floor.units.forEach(unit => {
                if (data.includes(unit.uid)) {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, bhk_type: unit.bhk_type, size: unit.size, att: unit.att, facing: unit.facing, status: false })
                } else {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, bhk_type: unit.bhk_type, size: unit.size, att: unit.att, facing: unit.facing, status: true })
                }
            })
            floors.push({ fid: floor.fid, floor_no: floor.floor_no, units });
        })
        updateTower({
            tid: myTower.tid,
            tname: myTower.tname,
            floors
        });
    }

    const applyOptions = (unitInfo, newAtt, newFace) => {
        let floors = [];
        myTower.floors.forEach(floor => {
            let units = [];
            floor.units.forEach(unit => {
                if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
                    units.push({
                        uid: unit.uid,
                        unit_no: unit.unit_no,
                        bhk_type: unitInfo.bhk,
                        size: unitInfo.area,
                        att: newAtt,
                        facing: newFace,
                        status: unit.status
                    });
                } else {
                    units.push({
                        uid: unit.uid,
                        unit_no: unit.unit_no,
                        bhk_type: unit.bhk_type,
                        size: unit.size,
                        att: unit.att,
                        facing: unit.facing,
                        status: unit.status
                    });
                }
            })
            floors.push({ fid: floor.fid, floor_no: floor.floor_no, units });
        })
        updateTower({
            tid: myTower.tid,
            tname: myTower.tname,
            floors
        });
        resetCheckBoxState();
    }

    const dynamicNumbering = () => {
        let numbering = ['B', 'G'];
        for (let i = 1; i <= myTower.floors.length + 1; i++) {
            numbering.push(i.toString());
        }
        return numbering;
    }

    const floorNumbering = dynamicNumbering();

    const rename = (type, id, value) => {
        let newData = myTower;
        if (value === "") {
            return;
        }
        if (type === 'floor') {
            let num = Number(floorNumbering.indexOf(value)) + newData.floors.length - Number(id.split('F')[1]);
            if (((floorNumbering.indexOf(value) + 1) - id.split('F')[1] < 0) || floorNumbering[num] === undefined) {
                alert("Cannot apply.. Please take care of other flat numbers");
            } else {
                newData.floors.forEach(f => {
                    if (Number(f.fid.split('F')[1]) > Number(id.split('F')[1])) {
                        f.floor_no = floorNumbering[num--];
                        let i = 1;
                        f.units.forEach(u => {
                            let num = "";
                            if (i < 10) {
                                num = `0${i++}`
                            }
                            u.unit_no = `${f.floor_no}${num}`
                        })
                    }
                    if (f.fid === id) {
                        f.floor_no = value;
                        let i = 1;
                        f.units.forEach(u => {
                            let num = "";
                            if (i < 10) {
                                num = `0${i++}`
                            }
                            u.unit_no = `${value}${num}`
                        })
                    }
                });
            }
        } else if (type === 'unit') {
            newData.floors.forEach(f => {
                if (f.fid === id.split('U')[0]) {
                    f.units.forEach(u => {
                        if (u.uid === id) {
                            u.unit_no = value;
                        }
                    })
                }
            });
        } else if (type === 'tower') {
            newData.tname = value;
        }
        updateTower(newData);
        forceUpdate();
    }

    const [rowState, setRowState] = React.useState(myTower.floors.map(u => { return false }));
    const handleRowClick = (index) => {
        let data = rowState;
        data[index] = !data[index];
        setRowState(data);
    }
    const [colState, setColState] = React.useState(myTower.floors[0].units.map(f => { return false }));
    const handleColClick = (index) => {
        let data = colState;
        data[index] = !data[index];
        setColState(data);
    }

    const resetCheckBoxState = () => {
        setRowSelect([]);
        setColSelect([]);
        setRowState(myTower.floors[0].units.map(u => { return false }));
        setColState(myTower.floors.map(f => { return false }));
    }

    return (myTower === undefined ? null : (
        <React.Fragment>
            <GenerateOptions unitInfo={unitInfo} attributes={uniqueAtt} facing={facing} apply={applyOptions} />
            <Grid>
                <TableContainer>
                    <TowerRename tower={myTower} update={rename} />
                    <Table size="small" aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography></Typography>
                                </TableCell>
                                {myTower.floors[0].units.map(unit => (
                                    <TableCell key={unit.uid}>
                                        <ColumnSelect
                                            units={unit}
                                            filter={handleColumnSelect}
                                            state={colState[unit.uid.split('U')[1] - 1]}
                                            click={handleColClick} />
                                    </TableCell>
                                ))}
                            </TableRow>
                            <React.Fragment>
                                {myTower.floors.map((floor) => (
                                    <TableRow key={floor.fid}>
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                <RowSelect
                                                    floor={floor}
                                                    filter={handleRowSelect}
                                                    rename={rename}
                                                    state={rowState[floor.fid.split('F')[1] - 1]}
                                                    click={handleRowClick}
                                                    floorValues={floorNumbering} />
                                            </Typography>
                                        </TableCell>
                                        {floor.units.map((unit) =>
                                            unit === undefined ? null : (
                                                <TableCell key={unit.uid}>
                                                    {getUnit(unit)}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <br />
            <Pagination count={project.length} page={page} onChange={handlePage} color="primary" />
            <br /><br />
            <center>
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={() => save(project)}>Save Draft</Button>
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={() => preview(project)} >Preview</Button>
            </center>
        </React.Fragment>
    ))
}

export default GenerateMatrix;
