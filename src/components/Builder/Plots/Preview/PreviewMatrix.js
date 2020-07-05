import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import BlockIcon from '@material-ui/icons/Block';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

function PreviewMatrix({ tower, filter, mySelect, selected }) {

    const getUnit = (unit) => {
        if (unit.status === true) {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip key={unit.uid} arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            key={unit.uid}
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "green", border: "1px solid black", cursor: "pointer" }}
                        ><center><Avatar style={{ backgroundColor: "inherit", color: "black" }}>{unit.unit_no}</Avatar></center></TableCell>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip key={unit.uid} arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? null : (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>)}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            key={unit.uid}
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "lightgreen", border: "1px solid black", cursor: "pointer" }}
                        ><center><Avatar style={{ backgroundColor: "inherit", color: "black" }}>{unit.unit_no}</Avatar></center></TableCell>
                    </Tooltip>
                )
            }
        } else {
            return (
                <TableCell
                    key={unit.uid}
                    style={{ backgroundColor: "red", border: "1px solid black" }}
                ><center><Avatar style={{ backgroundColor: "inherit" }}><BlockIcon style={{ color: "black" }} /></Avatar></center></TableCell>
            )
        }
    }

    return (
        tower === undefined ? null : (
            <TableContainer style={{ padding: "15px" }}>
                <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{tower.bname}</Typography>
                <Table size="small" aria-label="simple table">
                    {console.log(tower.floors[0])}
                    <TableBody>{tower.floors[0].fid.split('F')[1] < (tower.floors[1] === undefined ? 0 : tower.floors[1].fid.split('F')[1]) ? (
                        tower.floors.reverse().map((floor) => (
                            <React.Fragment>
                                <TableRow key={floor.fid}>
                                    <TableCell align="center">
                                        <Typography variant="body2">Row {floor.floor_no}</Typography>
                                    </TableCell>
                                    {floor.units.map((unit) =>
                                        unit === undefined ? null :
                                            (filter.length === 0 ? getUnit(unit) :
                                                (filter.includes(unit.size) ? getUnit(unit) : null)
                                            )
                                    )}
                                </TableRow>
                                {floor.fid.split('F')[1] % 2 === 1 ? null : (
                                    <TableRow>
                                        <TableCell></TableCell>
                                        {floor.units.map((unit) => (
                                            <TableCell key={unit.uid}></TableCell>
                                        ))}
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))
                    ) : (tower.floors.map((floor) => (
                        <React.Fragment key={floor.fid}>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography variant="body2">Row {floor.floor_no}</Typography>
                                </TableCell>
                                {floor.units.map((unit) =>
                                    unit === undefined ? null :
                                        (filter.length === 0 ? getUnit(unit) :
                                            (filter.includes(unit.size) ? getUnit(unit) : null)
                                        )
                                )}
                            </TableRow>
                            {floor.fid.split('F')[1] % 2 === 1 ? null : (
                                <TableRow key={floor.fid}>
                                    <TableCell></TableCell>
                                    {floor.units.map((unit) => (
                                        <TableCell key={unit.uid}></TableCell>
                                    ))}
                                </TableRow>
                            )}
                        </React.Fragment>
                    )))}
                    </TableBody>
                </Table>
            </TableContainer>
        ))
}

export default PreviewMatrix;
