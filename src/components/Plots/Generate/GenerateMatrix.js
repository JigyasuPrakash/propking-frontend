import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import RowSelect from './RowSelect';
import ColumnSelect from './ColumnSelect';
import GenerateOptions from './GenerateOptions';
import GenerateCell from './GenerateCell';
import Button from '@material-ui/core/Button';
import BlockRename from './BlockRename';

function GenerateMatrix({ blocks, unitInfo, uniqueAtt, facing, save, preview }) {

    const getUnit = (unit) =>
        (<GenerateCell
            unit={unit}
            variant="outlined"
            disable={handleDisabled} />);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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
    }

    return (
        <React.Fragment>
            <GenerateOptions unitInfo={unitInfo} attributes={uniqueAtt} facing={facing} />
            {blocks.map(myBlock => (
                <TableContainer>
                    <BlockRename block={myBlock} />
                    <Table size="small" aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography></Typography>
                                </TableCell>
                                {myBlock.floors[0].units.map(unit => (
                                    <TableCell key={unit.uid}>
                                        <ColumnSelect
                                            units={unit} />
                                    </TableCell>
                                ))}
                            </TableRow>
                            <React.Fragment>
                                {myBlock.floors.map((floor) => (
                                    <React.Fragment>
                                        <TableRow key={floor.fid}>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    <RowSelect
                                                        floor={floor} />
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
                                                {floor.units.map(() => (
                                                    <TableCell></TableCell>
                                                ))}
                                            </TableRow>)
                                        }
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
            <br /><br />
            <center>
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={() => save()}>Save Draft</Button>
                <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={() => preview()} >Preview</Button>
            </center>
        </React.Fragment>
    )
}

export default GenerateMatrix;
