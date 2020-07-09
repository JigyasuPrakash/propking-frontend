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

function PreviewMatrix({ tower, filter, mySelect, selected }) {

    const getUnit = (unit) => {
        if (unit.status === true) {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.landArea} Sq.Ft. - {unit.type} - {unit.bhk_type} BHK({unit.size} Sq.Fts.)</Typography><br />
                            <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button variant="contained" onClick={() => mySelect(unit)} color="primary"><HomeIcon style={{ color: "lightgreen" }} /></Button>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.landArea} Sq.Ft. - {unit.type} - {unit.bhk_type} BHK({unit.size} Sq.Fts.)</Typography><br />
                            <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button variant="outlined" onClick={() => mySelect(unit)} color="primary"><HomeIcon style={{ color: "lightgreen" }} /></Button>
                    </Tooltip>
                )
            }
        } else {
            return (
                <Button variant="outlined" disabled><HomeIcon color="secondary" /></Button>
            )
        }
    }

    return (
        tower === undefined ? null : (
            <TableContainer>
                <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{tower.bname}</Typography>
                <Table size="small" aria-label="simple table">
                    <TableBody>{tower.floors[0].floor_no < (tower.floors === undefined ? 0 : tower.floors[1].floor_no) ? (
                        tower.floors.reverse().map((floor) => (
                            <React.Fragment>
                                <TableRow key={floor.fid}>
                                    <TableCell align="center">
                                        <Typography variant="body2">Floor {floor.floor_no}</Typography>
                                    </TableCell>
                                    {floor.units.map((unit) =>
                                        unit === undefined ? null :
                                            (filter.length === 0 ? (
                                                <TableCell key={unit.uid}>
                                                    {getUnit(unit)}
                                                </TableCell>) :
                                                (filter.includes(unit.size) ? (
                                                    <TableCell key={unit.uid}>
                                                        {getUnit(unit)}
                                                    </TableCell>) : null
                                                )
                                            )
                                    )}
                                </TableRow>
                                {floor.fid.split('F')[1] % 2 === 0 ? null : (
                                    <TableRow>
                                        <TableCell></TableCell>
                                        {floor.units.map((unit) => (
                                            <TableCell key={unit.uid}></TableCell>
                                        ))}
                                    </TableRow>)
                                }
                            </React.Fragment>
                        ))
                    ) : (tower.floors.map((floor) => (
                        <React.Fragment>
                            <TableRow key={floor.fid}>
                                <TableCell align="center">
                                    <Typography variant="body2">Floor {floor.floor_no}</Typography>
                                </TableCell>
                                {floor.units.map((unit) =>
                                    unit === undefined ? null :
                                        (filter.length === 0 ? (
                                            <TableCell key={unit.uid}>
                                                {getUnit(unit)}
                                            </TableCell>) :
                                            (filter.includes(unit.size) ? (
                                                <TableCell key={unit.uid}>
                                                    {getUnit(unit)}
                                                </TableCell>) : null
                                            )
                                        )
                                )}
                            </TableRow>
                            {floor.fid.split('F')[1] % 2 === 0 ? null : (
                                <TableRow>
                                    <TableCell></TableCell>
                                    {floor.units.map((unit) => (
                                        <TableCell key={unit.uid}></TableCell>
                                    ))}
                                </TableRow>)
                            }
                        </React.Fragment>
                    )))}
                    </TableBody>
                </Table>
            </TableContainer>
        ))
}

export default PreviewMatrix;
