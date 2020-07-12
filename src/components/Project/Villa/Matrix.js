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
import Badge from '@material-ui/core/Badge';

function Matrix({ tower, areafilter, facingFilter, attributeFilter, mySelect, selected, leadcount }) {

    // unit.status -- true -> available || lead -> in lead || booked -> booked || false -> removed
    const getUnit = (unit) => {
        if (unit.status === 'true') {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
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
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
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
            let count = 0;
            leadcount.forEach(element => {
                if (element.unit_id === unit.uid) {
                    count = element.count;
                }
            });;
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Badge badgeContent={count} color="secondary">
                            <Button
                                variant="contained" color="primary"
                                onClick={() => mySelect(unit)}>
                                <HomeIcon style={{ color: "#d8db2e" }} />
                            </Button>
                        </Badge>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <Badge badgeContent={count} color="secondary">
                            <Button
                                variant="outlined" color="primary"
                                onClick={() => mySelect(unit)}>
                                <HomeIcon style={{ color: "#d8db2e" }} />
                            </Button>
                        </Badge>
                    </Tooltip>
                )
            }
        } else if (unit.status === "booked") {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
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
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
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
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
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
                            <Typography variant="body2" align="center">Villa No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.type} - {unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                            {unit.tags_set !== "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.tags_set}</Typography><br />
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
                        tower.floors.map((floor) => (
                            <React.Fragment>
                                <TableRow key={floor.fid}>
                                    <TableCell align="center" style={{ minWidth: "100px" }}>
                                        <Typography variant="body2">Row {floor.floor_no}</Typography>
                                    </TableCell>
                                    {floor.units.map((unit) =>
                                        unit === undefined ? null :
                                            (areafilter.length === 0 || areafilter.includes(unit.size)) ? (attributeFilter.length === 0 || attributeFilter.includes(unit.tags_set)) ? (facingFilter.length === 0 || facingFilter.includes(unit.facing)) ? (
                                                <TableCell key={unit.uid}>
                                                    {getUnit(unit)}
                                                </TableCell>) :
                                                <TableCell key={unit.uid}>
                                                    <Button
                                                        variant="outlined"
                                                        disabled
                                                        onClick={() => mySelect(unit)}>
                                                        <HomeIcon style={{ color: "white" }} />
                                                    </Button>
                                                </TableCell> :
                                                <TableCell key={unit.uid}>
                                                    <Button
                                                        variant="outlined"
                                                        disabled
                                                        onClick={() => mySelect(unit)}>
                                                        <HomeIcon style={{ color: "white" }} />
                                                    </Button>
                                                </TableCell> :
                                                <TableCell key={unit.uid}>
                                                    <Button
                                                        variant="outlined"
                                                        disabled
                                                        onClick={() => mySelect(unit)}>
                                                        <HomeIcon style={{ color: "white" }} />
                                                    </Button>
                                                </TableCell>
                                    )}
                                </TableRow>
                                {floor.fid.split('F')[1] % 2 === 1 ? null : (
                                    <TableRow>
                                        <TableCell></TableCell>
                                        {floor.units.map((unit) => (
                                            <TableCell key={unit.uid}></TableCell>
                                        ))}
                                    </TableRow>)
                                }
                            </React.Fragment>
                        ))
                    ) : (tower.floors.reverse().map((floor) => (
                        <React.Fragment>
                            <TableRow key={floor.fid}>
                                <TableCell align="center" style={{ minWidth: "100px" }}>
                                    <Typography variant="body2">Row {floor.floor_no}</Typography>
                                </TableCell>
                                {floor.units.map((unit) =>
                                    unit === undefined ? null :
                                        (areafilter.length === 0 || areafilter.includes(unit.size)) ? (attributeFilter.length === 0 || attributeFilter.includes(unit.tags_set)) ? (facingFilter.length === 0 || facingFilter.includes(unit.facing)) ? (
                                            <TableCell key={unit.uid}>
                                                {getUnit(unit)}
                                            </TableCell>) :
                                            <TableCell key={unit.uid}>
                                                <Button
                                                    variant="outlined"
                                                    disabled
                                                    onClick={() => mySelect(unit)}>
                                                    <HomeIcon style={{ color: "white" }} />
                                                </Button>
                                            </TableCell> :
                                            <TableCell key={unit.uid}>
                                                <Button
                                                    variant="outlined"
                                                    disabled
                                                    onClick={() => mySelect(unit)}>
                                                    <HomeIcon style={{ color: "white" }} />
                                                </Button>
                                            </TableCell> :
                                            <TableCell key={unit.uid}>
                                                <Button
                                                    variant="outlined"
                                                    disabled
                                                    onClick={() => mySelect(unit)}>
                                                    <HomeIcon style={{ color: "white" }} />
                                                </Button>
                                            </TableCell>
                                )}
                            </TableRow>
                            {floor.fid.split('F')[1] % 2 === 1 ? null : (
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

export default Matrix
