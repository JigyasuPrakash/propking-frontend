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
import FloorSelect from './FloorSelect';

function PreviewMatrix({ tower }) {

    const getUnit = (unit) => (
        floorSelect.includes(unit.uid.substring(0, unit.uid.length - 2)) ? (
            // Floor wise selected flats
            <Tooltip arrow title={(
                <React.Fragment>
                    <Typography variant="body2" align="center">FlatID: {unit.uid}</Typography>
                    <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography>
                </React.Fragment>
            )}>
                <Button id={unit.uid} variant="contained" color="primary"><HomeIcon style={{ color: "lightgreen" }} /></Button>
            </Tooltip>
        ) : (
                <Tooltip arrow title={(
                    <React.Fragment>
                        <Typography variant="body2" align="center">FlatID: {unit.uid}</Typography>
                        <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography>
                    </React.Fragment>
                )}>
                    <Button id={unit.uid} variant="outlined" color="primary"><HomeIcon style={{ color: "lightgreen" }} /></Button>
                </Tooltip>
            )
    );

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [floorSelect, setFloorSelect] = React.useState([]);
    const handleFloorSelect = (info) => {
        let data = floorSelect;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info });
        } else {
            data.push(info);
            forceUpdate();
        }
        setFloorSelect(data);
    }

    return (tower === undefined ? null : (
        <TableContainer>
            <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{tower.tname}</Typography>
            <Table size="small" aria-label="simple table">
                <TableBody>
                    {tower.floors[0].floor_no === 1 ?
                        tower.floors.reverse().map((floor) => (
                            <TableRow key={floor.fid}>
                                <TableCell align="center">
                                    <Typography variant="body2">
                                        <FloorSelect floor={floor} filter={handleFloorSelect} />
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
                        )) :
                        tower.floors.map((floor) => (
                            <TableRow key={floor.fid}>
                                <TableCell align="center">
                                    <FloorSelect floor={floor} filter={handleFloorSelect} />
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
                </TableBody>
            </Table>
        </TableContainer>
    ))
}

export default PreviewMatrix;
