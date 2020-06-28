import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PreviewMatrix from './PreviewMatrix';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    div: {
        alignItems: "center"
    }
}))

function MiddlePreview({ tower, areaFilter, unitSelect, selected }) {

    const styling = useStyles();

    return (tower === undefined ? (<CircularProgress />) : (
        <div className={styling.div}>
            {tower.map(t => (
                <React.Fragment key={t.tid}>
                    <Paper elevation={3}>
                        <PreviewMatrix tower={t} filter={areaFilter} mySelect={unitSelect} selected={selected} />
                    </Paper>
                    <br />
                </React.Fragment>
            ))}
        </div>
    ))
}

export default MiddlePreview;
