import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PreviewMatrix from './PreviewMatrix';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    div: {
        alignItems: "center"
    }
}))

function MiddlePreview({ tower, areaFilter, unitSelect, selected }) {

    const styling = useStyles();

    return (tower === undefined ? (<CircularProgress />) : (
        <div className={styling.div}>
            <PreviewMatrix tower={tower} filter={areaFilter} mySelect={unitSelect} selected={selected} />
            <br />
        </div>
    ))
}

export default MiddlePreview;
