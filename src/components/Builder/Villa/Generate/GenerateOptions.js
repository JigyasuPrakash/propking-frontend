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

function GenerateOptions({ unitInfo, attributes, facing, floorPlans, apply }) {
    const classes = useStyles();

    const [newAtt, setAtt] = React.useState('');
    const handleAtt = (event) => {
        setAtt(event.target.value);
    }

    const [newUnit, setUnit] = React.useState({ bhk: "", area: 0 });
    const [newInfo, setInfo] = React.useState('');
    const handleInfo = (event) => {
        setUnit({ landArea: event.target.value.landArea, type: event.target.value.type, bhk: event.target.value.bhk, area: event.target.value.area });
        setInfo(event.target.value);
    }

    const [newFace, setFace] = React.useState('');
    const handleFace = (event) => {
        setFace(event.target.value);
    }

    const [newFloorPlan, setFloorPlan] = React.useState('');
    const handlePlanChange = (event) => {
        setFloorPlan(event.target.value);
    }

    const applyOptions = () => {
        apply(newUnit, newAtt, newFace, newFloorPlan);
        setAtt('');
        setInfo('');
        setFace('');
        setFloorPlan('');
        setUnit({ bhk: "", area: 0 });
    }

    return (
        <div>
            <Grid container justify="space-evenly">
                <Grid item xs={2}>
                    <FormControl className={classes.formControl} fullWidth required>
                        <InputLabel>FlatTypes</InputLabel>
                        <Select value={newInfo} onChange={handleInfo} autoWidth>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {unitInfo.map(a => (
                                <MenuItem key={a.key} value={a}>{a.landArea} Sq.Yds. - {a.type} - {a.bhk} BHK ({a.area} Sq.Ft.)</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <FormControl className={classes.formControl} fullWidth>
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
                    <FormControl className={classes.formControl} fullWidth required>
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

                <Grid item xs={3}>
                    <FormControl className={classes.formControl} fullWidth required>
                        <InputLabel>Floor Plan</InputLabel>
                        <Select value={newFloorPlan} onChange={handlePlanChange} autoWidth>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {floorPlans.map(a => (
                                <MenuItem key={a.label} value={a.url}>{a.label}</MenuItem>
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
