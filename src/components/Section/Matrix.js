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

function getUnit(unit) {
    const title = (
        <React.Fragment>
            <Typography variant="body2" align="center">{unit.unitId}</Typography>
            <Typography variant="caption" align="center">{unit.type} ({unit.area} Sq.Ft.)</Typography>
        </React.Fragment>
    );

    switch (unit.status) {
        case "available": return (
            <Tooltip arrow title={title}>
                <Button variant="contained" color="primary"><HomeIcon style={{ color: "lightgreen" }} /></Button>
            </Tooltip>
        );
        case "sold": return (
            <Button variant="contained" disabled><HomeIcon color="secondary" /></Button>
        );
        case "unavailable": return (
            <Button variant="contained" disabled><HomeIcon /></Button>
        );
        default: console.error(unit)
    }
}

function Matrix({ tower }) {
    return (
        <TableContainer>
            <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{tower.name}</Typography>
            <Table size="small" aria-label="simple table">
                <TableBody>
                    {tower.floors.map((floor) => (
                        <TableRow key={floor.floorNo}>
                            <TableCell align="center">
                                <Typography variant="body2">Floor {floor.floorNo}</Typography>
                            </TableCell>
                            {floor.units.map((unit) => (
                                <TableCell key={unit.unitId}>
                                    {getUnit(unit)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Matrix
