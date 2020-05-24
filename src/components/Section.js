import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LeftSection from './Section/LeftSection';
import MiddleSection from './Section/MiddleSection';
import RightSection from './Section/RightSection';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    grid: {
        margin: "18px"
    }
}));

function Section({ project }) {
    const classes = useStyles();

    return (
        <Grid container justify="space-evenly">
            <Grid item sm xs={12} className={classes.grid}>
                <Paper elevation={3} >
                    <LeftSection tower={project.tower} unitInfo={project.unitInfo} />
                </Paper>
            </Grid>

            <Grid item sm={6} xs={12} className={classes.grid}>
                <Paper elevation={3} >
                    <MiddleSection />
                </Paper>
            </Grid>

            <Grid item sm xs={12} className={classes.grid}>
                <Paper elevation={3} >
                    <RightSection />
                </Paper>
            </Grid>

        </Grid>
    );
}

export default Section;