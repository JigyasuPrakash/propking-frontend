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

function GenerateMatrix({ block, update, unitInfo, uniqueAtt, facing, floorPlans }) {

    const [myBlock, setTower] = React.useState(block);
    const updateBlock = (newBlock) => {
        setTower(newBlock);
        update(newBlock);
    }

    const getUnit = (unit) => {
        if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
            // Selected Units
            let color = ""
            unit.status ? (color = "grey") : (color = "red");
            return (<GenerateCell
                unit={unit}
                variant="contained"
                filter={handleIndividual}
                color={color}
                disable={handleDisabled}
                rename={rename}
                applyDisable={applyDisable} />);
        } else {
            let color = ""
            unit.status ? (color = "grey") : (color = "red");
            return (<GenerateCell
                unit={unit}
                variant="outlined"
                filter={handleIndividual}
                color={color}
                disable={handleDisabled}
                rename={rename}
                applyDisable={applyDisable} />);
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
        myBlock.floors.forEach(floor => {
            let units = []
            floor.units.forEach(unit => {
                if (data.includes(unit.uid)) {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, size: unit.size, att: unit.att, facing: unit.facing, status: false })
                } else {
                    units.push({ uid: unit.uid, unit_no: unit.unit_no, size: unit.size, att: unit.att, facing: unit.facing, status: true })
                }
            })
            floors.push({ fid: floor.fid, floor_no: floor.floor_no, units });
        })
        updateBlock({
            tid: myBlock.tid,
            tname: myBlock.tname,
            floors
        });
    }

    const applyOptions = (unitInfo, newAtt, newFace, newFloor) => {
        let floors = [];
        myBlock.floors.forEach(floor => {
            let units = [];
            floor.units.forEach(unit => {
                if (rowSelect.includes(unit.uid) || colSelect.includes(unit.uid)) {
                    units.push({
                        uid: unit.uid,
                        unit_no: unit.unit_no,
                        landArea: unitInfo.landArea,
                        type: unitInfo.type,
                        size: unitInfo.area,
                        bhk_type: unitInfo.bhk,
                        att: newAtt,
                        facing: newFace,
                        status: unit.status,
                        g_img_set: newFloor
                    });
                } else {
                    units.push(unit);
                }
            })
            floors.push({ fid: floor.fid, floor_no: floor.floor_no, units });
        })
        updateBlock({
            tid: myBlock.tid,
            tname: myBlock.tname,
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
                if (f.fid === id.split('U')[0]) {
                    f.units.forEach(u => {
                        if (u.uid === id) {
                            u.unit_no = value;
                        }
                    })
                }
            });
        } else if (type === 'block') {
            newData.tname = value;
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
        <Paper>
            <GenerateOptions unitInfo={unitInfo} attributes={uniqueAtt} facing={facing} floorPlans={floorPlans} apply={applyOptions} />
            <TableContainer>
                <BlockRename block={myBlock} update={rename} />
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography></Typography>
                            </TableCell>
                            {myBlock.floors[0].units.map(unit => (
                                <TableCell key={unit.uid}>
                                    <ColumnSelect
                                        units={unit}
                                        filter={handleColumnSelect}
                                        state={colState[unit.uid.split('U')[1] - 1]}
                                        click={handleColClick} />
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
                                            <TableCell key={unit.uid}>
                                                {getUnit(unit)}
                                            </TableCell>
                                        ))}
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
                            ))}
                        </React.Fragment>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default GenerateMatrix;
