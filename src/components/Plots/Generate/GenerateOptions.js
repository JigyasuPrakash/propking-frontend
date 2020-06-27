import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function GenerateOptions({ unitInfo, attributes, facing, apply }) {
    const classes = useStyles();

    const [newAtt, setAtt] = React.useState('');
    const handleAtt = (event) => {
        setAtt(event.target.value);
    }

    const [newUnit, setUnit] = React.useState({});
    const [newInfo, setInfo] = React.useState('');
    const handleInfo = (event) => {
        setUnit({ bhk: event.target.value.bhk, area: event.target.value.area });
        setInfo(event.target.value);
    }

    const [newFace, setFace] = React.useState('');
    const handleFace = (event) => {
        setFace(event.target.value);
    }

    const applyOptions = () => {
        apply(newUnit, newAtt, newFace);
        setAtt('');
        setInfo('');
        setFace('');
        setUnit({});
    }

    return (
        <div>
            <Grid container justify="space-evenly">
                <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>FlatTypes</InputLabel>
                        <Select value={newInfo} onChange={handleInfo} autoWidth>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {unitInfo.map(a => (
                                <MenuItem key={a.key} value={a}>{a.area} Sq.Yds.</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Attributes</InputLabel>
                        <Select value={newAtt} onChange={handleAtt} autoWidth>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {attributes.map(a => (
                                <MenuItem key={a.key} value={a.label}>{a.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Facing</InputLabel>
                        <Select value={newFace} onChange={handleFace} autoWidth>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {facing.map(a => (
                                <MenuItem key={a} value={a}>{a}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={applyOptions}
                        className={classes.formControl}
                        style={{ marginTop: "20px" }}>
                        Apply
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default GenerateOptions;
