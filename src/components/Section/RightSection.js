import React from 'react';
import Typography from '@material-ui/core/Typography';

function RightSection({ unit }) {
    return (
        unit === undefined ?
            (
                <React.Fragment>
                    <Typography variant="h6" style={{padding: "10px"}}>Click on any House to view Price options</Typography>
                </React.Fragment>
            ) :
            (
                <React.Fragment>
                    <Typography>{unit}</Typography>
                </React.Fragment>
            )
    )
}

export default RightSection
