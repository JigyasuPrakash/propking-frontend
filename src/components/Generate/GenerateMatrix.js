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

function PreviewMatrix({ tower, uniqueArea, uniqueAtt, flatTypes, facing, save, preview }) {

    const [myTower, setTower] = React.useState(tower);

    const getUnit = (unit) => {
        if (columnSelect.includes('U' + unit.uid.split('U')[1]) || floorSelect.includes(unit.uid.split('U')[0]) || individual.includes(unit.uid)) {
            // Selected Units
            let color = ""
            unit.status ? (color = "lightgreen") : (color = "red");
            return (<GenerateCell
                unit={unit}
                variant="contained"
                filter={handleIndividual}
                color={color}
                disable={handleDisabled}
                applyDisable={applyDisable} />);
        } else {
            let color = ""
            unit.status ? (color = "lightgreen") : (color = "red");
            return (<GenerateCell
                unit={unit}
                variant="outlined"
                filter={handleIndividual}
                color={color}
                disable={handleDisabled}
                applyDisable={applyDisable} />);
        }
    };

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [floorSelect, setFloorSelect] = React.useState([]);
    const handleRowSelect = (info) => {
        let data = floorSelect;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info });
        } else {
            data.push(info);
            forceUpdate();
        }
        setFloorSelect(data);
    }

    const [columnSelect, setRowSelect] = React.useState([]);
    const handleColumnSelect = (info) => {
        let data = columnSelect;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info });
        } else {
            data.push(info);
            forceUpdate();
        }
        setRowSelect(data);
    }

    const [individual, setIndividual] = React.useState([]);
    const handleIndividual = (info) => {
        let data = individual;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info });
        } else {
            data.push(info);
            forceUpdate();
        }
        setIndividual(data);
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
                    units.push({ uid: unit.uid, bhk_type: unit.bhk_type, size: unit.size, att: unit.att, facing: unit.facing, status: false })
                } else {
                    units.push({ uid: unit.uid, bhk_type: unit.bhk_type, size: unit.size, att: unit.att, facing: unit.facing, status: true })
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

    const applyOptions = (newArea, newAtt, newFlat, newFace) => {
        let floors = []
        tower.floors.forEach(floor => {
            let units = []
            floor.units.forEach(unit => {
                if (columnSelect.includes('U' + unit.uid.split('U')[1]) || floorSelect.includes(unit.uid.split('U')[0]) || individual.includes(unit.uid)) {
                    units.push({ uid: unit.uid, bhk_type: newFlat, size: newArea, att: newAtt, facing: newFace, status: unit.status });
                } else {
                    units.push({ uid: unit.uid, bhk_type: unit.bhk_type, size: unit.size, att: unit.att, facing: unit.facing, status: unit.status });
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

    return (myTower === undefined ? null : (
        <React.Fragment>
            <GenerateOptions area={uniqueArea} attributes={uniqueAtt} flatTypes={flatTypes} facing={facing} apply={applyOptions} />
            <Grid>
                <TableContainer>
                    <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{myTower.tname}</Typography>
                    <Table size="small" aria-label="simple table">
                        <TableBody>
                            {myTower.floors[0].floor_no === 1 ? (
                                <React.Fragment>
                                    {myTower.floors.reverse().map((floor) => (
                                        <TableRow key={floor.fid}>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    <RowSelect floor={floor} filter={handleRowSelect} />
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
                                                        <RowSelect floor={floor} filter={handleRowSelect} />
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
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={() => save(myTower)}>Save Changes</Button>
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={preview} >Preview</Button>
            </center>
        </React.Fragment>
    ))
}

export default PreviewMatrix;
