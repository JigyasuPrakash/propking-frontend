import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import RowSelect from './RowSelect';
import ColumnSelect from './ColumnSelect';
import GenerateCell from './GenerateCell';
import BlockRename from './BlockRename';
import GenerateOptions from './GenerateOptions';
import Paper from '@material-ui/core/Paper';

function GenerateMatrix({ block, update, unitInfo, uniqueAtt, facing }) {

    const [myBlock, setTower] = React.useState(block);
    const updateBlock = (newBlock) => {
        setTower(newBlock);
        update(newBlock);
    }

    const getUnit = (unit) => {
        if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
            // Selected Units
            return (<GenerateCell
                unit={unit}
                variant="2px #000080 solid"
                filter={handleIndividual}
                disable={applyDisable}
                rename={rename}
            />);
        } else {
            return (<GenerateCell
                unit={unit}
                variant="1px grey solid"
                filter={handleIndividual}
                disable={applyDisable}
                rename={rename}
            />);
        }
    };

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [rowSelect, setRowSelect] = React.useState([]);
    const handleRowSelect = (info, state) => {
        let data = rowSelect;
        // Selecting row (T1F1)
        let myInfo = myBlock.floors[0].units.map(u => info + 'U' + u.uid.split('U')[1]);
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
        let myInfo = myBlock.floors.map(f => f.fid + info);
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

    const handleIndividual = (info) => {
        let rowData = rowSelect;
        let colData = colSelect;
        if (rowData.includes(info) || colData.includes(info)) {
            rowData = rowData.filter(a => { return a !== info });
            colData = colData.filter(a => { return a !== info });
        } else {
            rowData.push(info);
            colData.push(info);
        }
        forceUpdate();
        setRowSelect(rowData);
        setColSelect(colData);
    }

    const applyDisable = (data) => {
        let floors = [];
        myBlock.floors.forEach(floor => {
            let units = []
            floor.units.forEach(unit => {
                if (unit.uid === data) {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, size: unit.size, att: unit.att, facing: unit.facing, status: !unit.status });
                } else {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, size: unit.size, att: unit.att, facing: unit.facing, status: unit.status })
                }
            })
            floors.push({ fid: floor.fid, floor_no: floor.floor_no, units });
        })
        updateBlock({
            tid: myBlock.tid,
            bname: myBlock.bname,
            floors
        });
    }

    const applyOptions = (unitInfo, newAtt, newFace) => {
        let floors = [];
        myBlock.floors.forEach(floor => {
            let units = [];
            floor.units.forEach(unit => {
                if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
                    units.push({
                        uid: unit.uid,
                        unit_no: unit.unit_no,
                        size: unitInfo,
                        att: newAtt,
                        facing: newFace,
                        status: unit.status
                    });
                } else {
                    units.push(unit);
                }
            })
            floors.push({ fid: floor.fid, floor_no: floor.floor_no, units });
        })
        updateBlock({
            tid: myBlock.tid,
            bname: myBlock.bname,
            floors
        });
        resetCheckBoxState();
    }

    const rename = (type, id, value) => {
        let newData = myBlock;
        if (value === "") {
            return;
        }
        if (type === 'floor') {
            newData.floors.forEach(f => {
                if (f.fid === id) {
                    f.floor_no = value;
                }
            });
        } else if (type === 'unit') {
            newData.floors.forEach(f => {
                f.units.forEach(u => {
                    if (u.unit_no === value) {
                        alert("Duplicate entries found!");
                        value = "";
                    }
                })
            });
            newData.floors.forEach(f => {
                if (f.fid === id.split('U')[0]) {
                    f.units.forEach(u => {
                        if (u.uid === id) {
                            u.unit_no = value === "" ? u.unit_no : value;
                        }
                    })
                }
            });
        } else if (type === 'block') {
            newData.bname = value;
        }
        updateBlock(newData);
        forceUpdate();
    }

    const [rowState, setRowState] = React.useState(myBlock.floors.map(u => { return false }));
    const handleRowClick = (index) => {
        let data = rowState;
        data[index] = !data[index];
        setRowState(data);
    }
    const [colState, setColState] = React.useState(myBlock.floors[0].units.map(f => { return false }));
    const handleColClick = (index) => {
        let data = colState;
        data[index] = !data[index];
        setColState(data);
    }

    const resetCheckBoxState = () => {
        setRowSelect([]);
        setColSelect([]);
        setRowState(myBlock.floors[0].units.map(u => { return false }));
        setColState(myBlock.floors.map(f => { return false }));
    }

    return (
        <Paper style={{ margin: "20px" }}>
            <GenerateOptions unitInfo={unitInfo} attributes={uniqueAtt} facing={facing} apply={applyOptions} />
            <TableContainer style={{ padding: "20px" }}>
                <BlockRename block={myBlock} update={rename} />
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography></Typography>
                            </TableCell>
                            {myBlock.floors[0].units.map(unit => (
                                <TableCell key={unit.uid}>
                                    <center>
                                        <ColumnSelect
                                            units={unit}
                                            filter={handleColumnSelect}
                                            state={colState[unit.uid.split('U')[1] - 1]}
                                            click={handleColClick} />
                                    </center>
                                </TableCell>
                            ))}
                        </TableRow>
                        <React.Fragment>
                            {myBlock.floors.map((floor) => (
                                <React.Fragment key={floor.fid}>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                <RowSelect
                                                    floor={floor}
                                                    filter={handleRowSelect}
                                                    rename={rename}
                                                    state={rowState[floor.fid.split('F')[1] - 1]}
                                                    click={handleRowClick} />
                                            </Typography>
                                        </TableCell>
                                        {floor.units.map((unit) => (
                                            <React.Fragment key={unit.uid}>
                                                {getUnit(unit)}
                                            </React.Fragment>
                                        ))}
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
                            ))}
                        </React.Fragment>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default GenerateMatrix;
