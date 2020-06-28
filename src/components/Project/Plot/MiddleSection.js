import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Matrix from './Matrix'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    div: {
        alignItems: "center"
    }
}))

function MiddleSection({ tower, areaFilter, unitSelect, selected }) {

    const styling = useStyles();

    return (tower === undefined ? (<CircularProgress />) : (
        <div className={styling.div}>
            {tower.map(t => (
                <React.Fragment>
                    <Paper elevation={3}>
                        <Matrix tower={t} filter={areaFilter} mySelect={unitSelect} selected={selected} />
                    </Paper>
                    <br />
                </React.Fragment>
            ))}
        </div>
    ))
}

export default MiddleSection
