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

    const [filteredTower, myFilter] = React.useState(project.tower);
    const handleTowerFilter = (info) => {
        let data = project.tower.filter((t) => {
            return info.includes(t.TID);
        });
        if (data.length === 0) {
            data = project.tower;
        }
        myFilter(data);
    }

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [areaArray, updateArea] = React.useState([]);
    const handleAreaFilter = (info) => {
        let data = areaArray;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info })
        } else {
            data.push(info)
            forceUpdate()
        }
        updateArea(data)
    }

    return (
        <Grid container justify="space-evenly">
            <Grid item sm xs={12} className={classes.grid}>
                <Paper elevation={3} >
                    <LeftSection tower={project.tower} unitInfo={project.unitInfo} areaFilter={handleAreaFilter} towerFilter={handleTowerFilter} />
                </Paper>
            </Grid>

            <Grid item sm={6} xs={12} className={classes.grid}>
                <Paper elevation={3}>
                    <MiddleSection tower={filteredTower} areaFilter={areaArray} />
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