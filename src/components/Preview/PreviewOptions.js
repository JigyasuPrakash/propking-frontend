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

function PreviewOptions({ area, attributes }) {
    const classes = useStyles();

    const [newArea, setArea] = React.useState('');
    const handleArea = (event) => {
        setArea(event.target.value);
    }

    const [newAtt, setAtt] = React.useState('');
    const handleAtt = (event) => {
        setAtt(event.target.value);
    }


    return (
        <div>
            <Grid container justify="space-evenly">
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Area</InputLabel>
                        <Select value={newArea} onChange={handleArea} autoWidth>
                            {area.map(a => (
                                <MenuItem key={a.key} value={a.label}>{a.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Attributes</InputLabel>
                        <Select value={newAtt} onChange={handleAtt} autoWidth>
                            {attributes.map(a => (
                                <MenuItem key={a.key} value={a.label}>{a.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.formControl}
                        style={{ marginTop: "20px" }}>
                        Apply
                    </Button>
                </Grid>
            </Grid>

        </div>
    )
}

export default PreviewOptions
