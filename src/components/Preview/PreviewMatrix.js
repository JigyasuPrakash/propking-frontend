import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import RowSelect from './RowSelect';
import ColumnSelect from './ColumnSelect';
import Grid from '@material-ui/core/Grid';
import PreviewOptions from './PreviewOptions';

function PreviewMatrix({ tower, uniqueArea, uniqueAtt, flatTypes, facing }) {

    const [myTower, setTower] = React.useState(tower);

    const getUnit = (unit) => (
        columnSelect.includes('U' + unit.uid.split('U')[1]) || floorSelect.includes(unit.uid.split('U')[0]) ? (
            // Selected Units
            <Tooltip interactive arrow title={(
                <React.Fragment>
                    <Typography variant="body2" align="center">FlatID: {unit.uid}</Typography>
                    <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                    <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                    <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                </React.Fragment>
            )}>
                <Button id={unit.uid} variant="contained" color="primary"><HomeIcon style={{ color: "lightgreen" }} /></Button>
            </Tooltip>
        ) : (
                <Tooltip interactive arrow title={(
                    <React.Fragment>
                        <Typography variant="body2" align="center">FlatID: {unit.uid}</Typography>
                        <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                        <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                        <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                    </React.Fragment>
                )}>
                    <Button id={unit.uid} variant="outlined" color="primary"><HomeIcon style={{ color: "lightgreen" }} /></Button>
                </Tooltip>
            )
    );

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

    const applyOptions = (newArea, newAtt, newFlat, newFace) => {
        let floors = []
        tower.floors.forEach(floor => {
            let units = []
            floor.units.forEach(unit => {
                if (columnSelect.includes('U' + unit.uid.split('U')[1]) || floorSelect.includes(unit.uid.split('U')[0])) {
                    units.push({ uid: unit.uid, bhk_type: newFlat, size: newArea, att: newAtt, facing: newFace });
                } else {
                    units.push({ uid: unit.uid, bhk_type: unit.bhk_type, size: unit.size, att: unit.att, facing: unit.facing })
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
            <PreviewOptions area={uniqueArea} attributes={uniqueAtt} flatTypes={flatTypes} facing={facing} apply={applyOptions} />
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
        </React.Fragment>
    ))
}

export default PreviewMatrix;
