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

function Matrix({ tower, filter, mySelect, selected }) {

    // unit.status -- true -> available || lead -> in lead || booked -> booked || false -> removed
    const getUnit = (unit) => {
        if (unit.status === 'true') {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="contained"
                            onClick={() => mySelect(unit)}
                            color="primary">
                            <HomeIcon style={{ color: "lightgreen" }} />
                        </Button>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="outlined"
                            onClick={() => mySelect(unit)}
                            color="primary">
                            <HomeIcon style={{ color: "lightgreen" }} />
                        </Button>
                    </Tooltip>
                )
            }
        } else if (unit.status === "lead") {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="contained" color="primary"
                            onClick={() => mySelect(unit)}>
                            <HomeIcon style={{ color: "#d8db2e" }} />
                        </Button>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="outlined" color="primary"
                            onClick={() => mySelect(unit)}>
                            <HomeIcon style={{ color: "#d8db2e" }} />
                        </Button>
                    </Tooltip>
                )
            }
        } else if (unit.status === "booked") {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="contained" color="primary"
                            onClick={() => mySelect(unit)}>
                            <HomeIcon color="secondary" />
                        </Button>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="outlined" color="primary"
                            onClick={() => mySelect(unit)}>
                            <HomeIcon color="secondary" />
                        </Button>
                    </Tooltip>
                )
            }
        } else if (unit.status === "false") {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="contained" color="primary"
                            onClick={() => mySelect(unit)}>
                            <HomeIcon style={{ color: "grey" }} />
                        </Button>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Flat No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Button
                            variant="outlined" color="primary"
                            onClick={() => mySelect(unit)}>
                            <HomeIcon style={{ color: "grey" }} />
                        </Button>
                    </Tooltip>
                )
            }
        }
    }

    return (
        tower === undefined ? null : (
            <TableContainer>
                <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{tower.tname}</Typography>
                <Table size="small" aria-label="simple table">
                    <TableBody>{tower.floors[0].fid.split('F')[1] < (tower.floors === undefined ? 0 : tower.floors[1].fid.split('F')[1]) ? (
                        tower.floors.reverse().map((floor) => (
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
                        ))
                    ) : (tower.floors.map((floor) => (
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
                    )))}
                    </TableBody>
                </Table>
            </TableContainer>
        ))
}

export default Matrix
