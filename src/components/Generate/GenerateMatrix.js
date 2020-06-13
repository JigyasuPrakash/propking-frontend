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

function GenerateMatrix({ tower, unitInfo, uniqueAtt, facing, save, preview, update }) {

    const [myTower, setTower] = React.useState(tower);

    const getUnit = (unit) => {
        if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
            // Selected Units
            let color = ""
            unit.status ? (color = "lightgreen") : (color = "red");
            return (<GenerateCell
                unit={unit}
                variant="contained"
                filter={handleIndividual}
                color={color}
                state={true}
                disable={handleDisabled}
                renameModal={rename}
                applyDisable={applyDisable} />);
        } else {
            let color = ""
            unit.status ? (color = "lightgreen") : (color = "red");
            return (<GenerateCell
                unit={unit}
                variant="outlined"
                filter={handleIndividual}
                color={color}
                state={false}
                disable={handleDisabled}
                renameModal={rename}
                applyDisable={applyDisable} />);
        }
    };

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [rowSelect, setRowSelect] = React.useState([]);
    const handleRowSelect = (info, state) => {
        let data = rowSelect;
        // Selecting row (T1F1)
        let myInfo = tower.floors[0].units.map(u => info + 'U' + u.uid.split('U')[1]);
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
        let myInfo = tower.floors.map(f => f.fid + info);
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

    const handleIndividual = (info, state) => {
        let rowData = rowSelect;
        let colData = colSelect;
        if (state) {
            if (rowData.includes(info)) {
                rowData = rowData.filter(a => { return a !== info });
            } else {
                rowData.push(info);
            }
            if (colData.includes(info)) {
                colData = colData.filter(a => { return a !== info });
            } else {
                colData.push(info);
            }
        } else {
            if (rowData.includes(info)) {
                rowData = rowData.filter(a => { return a !== info });
            }
            if (colData.includes(info)) {
                colData = colData.filter(a => { return a !== info });
            }
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
        tower.floors.forEach(floor => {
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
        setTower({
            tid: myTower.tid,
            tname: myTower.tname,
            floors
        });
    }

    const applyOptions = (unitInfo, newAtt, newFace) => {
        let floors = []
        tower.floors.forEach(floor => {
            let units = []
            floor.units.forEach(unit => {
                if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, bhk_type: unitInfo.bhk, size: unitInfo.area, att: newAtt, facing: newFace, status: unit.status });
                } else {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, bhk_type: unit.bhk_type, size: unit.size, att: unit.att, facing: unit.facing, status: unit.status });
                }
            })
            floors.push({ fid: floor.fid, floor_no: floor.floor_no, units });
        })
        setTower({
            tid: myTower.tid,
            tname: myTower.tname,
            floors
        });
        update({
            tid: myTower.tid,
            tname: myTower.tname,
            floors
        });
    }

    const rename = (type, id, value) => {
        let newData = myTower;
        if (type === 'floor') {
            newData.floors.forEach(f => {
                if (f.fid === id) {
                    f.floor_no = value;
                }
            })
        } else {
            newData.floors.forEach(f => {
                if (f.fid === id.split('U')[0]) {
                    f.units.forEach(u => {
                        if (u.uid === id) {
                            u.unit_no = value;
                        }
                    })
                }
            })
        }
        setTower(newData);
    }

    return (myTower === undefined ? null : (
        <React.Fragment>
            <GenerateOptions unitInfo={unitInfo} attributes={uniqueAtt} facing={facing} apply={applyOptions} />
            <Grid>
                <TableContainer>
                    <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{myTower.tname}</Typography>
                    <Table size="small" aria-label="simple table">
                        <TableBody>
                            {myTower.floors[0].floor_no < myTower.floors[1].floor_no ? (
                                <React.Fragment>
                                    {myTower.floors.reverse().map((floor) => (
                                        <TableRow key={floor.fid}>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    <RowSelect floor={floor} filter={handleRowSelect} renameModal={rename} />
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
                                    <TableRow>
                                        <TableCell>
                                            <Typography></Typography>
                                        </TableCell>
                                        {myTower.floors[0].units.map(unit => (
                                            <TableCell key={unit.uid}>
                                                <ColumnSelect row={unit} filter={handleColumnSelect} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </React.Fragment>) : (
                                    <React.Fragment>
                                        {myTower.floors.map((floor) => (
                                            <TableRow key={floor.fid}>
                                                <TableCell align="center">
                                                    <Typography variant="body2">
                                                        <RowSelect floor={floor} filter={handleRowSelect} renameModal={rename} />
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
                                        <TableRow>
                                            <TableCell>
                                                <Typography></Typography>
                                            </TableCell>
                                            {myTower.floors[0].units.map(unit => (
                                                <TableCell key={unit.uid}>
                                                    <ColumnSelect row={unit} filter={handleColumnSelect} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </React.Fragment>)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <br /><br />
            <center>
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={save}>Save Draft</Button>
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={preview} >Preview</Button>
            </center>
        </React.Fragment>
    ))
}

export default GenerateMatrix;
