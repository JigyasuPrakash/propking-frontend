import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

function PreviewMatrix({ tower, areafilter, facingFilter, attributeFilter, mySelect, selected, leadcount }) {

    const getUnit = (unit) => {
        if (unit.status === 'true') {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "darkgreen", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                    {unit.unit_no}
                                </Avatar>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "lightgreen", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                    {unit.unit_no}
                                </Avatar>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            }
        } else if (unit.status === "lead") {
            let count = 0;
            leadcount.forEach(element => {
                if (element.unit_id === unit.uid) {
                    count = element.count;
                }
            });

            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "#d8db2e", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Badge badgeContent={count} color="secondary">
                                    <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                        {unit.unit_no}
                                    </Avatar>
                                </Badge>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "yellow", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Badge badgeContent={count} color="secondary">
                                    <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                        {unit.unit_no}
                                    </Avatar>
                                </Badge>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            }
        } else if (unit.status === "booked") {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "darkred", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                    {unit.unit_no}
                                </Avatar>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "red", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                    {unit.unit_no}
                                </Avatar>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            }
        } else if (unit.status === "false") {
            if (unit.uid === selected.uid) {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "darkgrey", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                    {unit.unit_no}
                                </Avatar>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip arrow title={(
                        <React.Fragment>
                            <Typography variant="body2" align="center">Plot No: {unit.unit_no}</Typography>
                            <Typography variant="caption" align="center">{unit.size} Sq.Yds.</Typography><br />
                            {unit.att === "" ? (<React.Fragment>
                                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                            </React.Fragment>) : null}
                            <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                        </React.Fragment>
                    )}>
                        <TableCell
                            onClick={() => mySelect(unit)}
                            style={{ backgroundColor: "grey", border: "1px solid black", cursor: "pointer" }}
                        >
                            <center>
                                <Avatar style={{ backgroundColor: "inherit", color: "black" }}>
                                    {unit.unit_no}
                                </Avatar>
                            </center>
                        </TableCell>
                    </Tooltip>
                )
            }
        }
    }

    return (
        tower === undefined ? null : (
            <TableContainer style={{ padding: "15px" }}>
                <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">{tower.bname}</Typography>
                <Table size="small" aria-label="simple table">
                    <TableBody>{tower.floors[0].fid.split('F')[1] === 1 ? (
                        tower.floors.reverse().map((floor) => (
                            <React.Fragment>
                                <TableRow key={floor.fid}>
                                    <TableCell align="center" style={{ minWidth: "80px" }}>
                                        <Typography variant="body2">Row {floor.floor_no}</Typography>
                                    </TableCell>
                                    {floor.units.map((unit) =>
                                        unit === undefined ? null :
                                            (areafilter.length === 0 || areafilter.includes(unit.size)) ? (attributeFilter.length === 0 || attributeFilter.includes(unit.tags_set)) ? (facingFilter.length === 0 || facingFilter.includes(unit.facing)) ? getUnit(unit) : (
                                                <TableCell
                                                    key={unit.uid}
                                                    style={{ border: "1px solid black", }}
                                                ><center><Avatar style={{ backgroundColor: "white", color: "white" }}>{3}</Avatar></center></TableCell>
                                            ) : (
                                                    <TableCell
                                                        key={unit.uid}
                                                        style={{ border: "1px solid black", }}
                                                    ><center><Avatar style={{ backgroundColor: "white", color: "white" }}>{2}</Avatar></center></TableCell>
                                                ) : (
                                                    <TableCell
                                                        key={unit.uid}
                                                        style={{ border: "1px solid black", }}
                                                    ><center><Avatar style={{ backgroundColor: "white", color: "white" }}>{1}</Avatar></center></TableCell>
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
                                <TableCell align="center" style={{ minWidth: "80px" }}>
                                    <Typography variant="body2">Row {floor.floor_no}</Typography>
                                </TableCell>
                                {floor.units.map((unit) =>
                                    unit === undefined ? null :
                                        (areafilter.length === 0 || areafilter.includes(unit.size)) ? (attributeFilter.length === 0 || attributeFilter.includes(unit.tags_set)) ? (facingFilter.length === 0 || facingFilter.includes(unit.facing)) ? getUnit(unit) : (
                                            <TableCell
                                                key={unit.uid}
                                                style={{ border: "1px solid black", }}
                                            ><center><Avatar style={{ backgroundColor: "white", color: "white" }}>{3}</Avatar></center></TableCell>
                                        ) : (
                                                <TableCell
                                                    key={unit.uid}
                                                    style={{ border: "1px solid black", }}
                                                ><center><Avatar style={{ backgroundColor: "white", color: "white" }}>{2}</Avatar></center></TableCell>
                                            ) : (
                                                <TableCell
                                                    key={unit.uid}
                                                    style={{ border: "1px solid black", }}
                                                ><center><Avatar style={{ backgroundColor: "white", color: "white" }}>{1}</Avatar></center></TableCell>
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
