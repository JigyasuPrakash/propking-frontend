import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function Title({ name }) {

    const styling = {
        "div": {
            margin: "20px"
        },
        "img": {
            "border": "1px solid grey",
            "height": "50px"
        }
    }

    return (
        <div style={styling.div}>
            <Grid container justify="space-evenly">
                <Grid xs={8} item>
                    <img src="data:image/png;base64,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"
                        style={styling.img}
                        alt="logo" />
                    <Typography variant="h6">{name}</Typography>
                </Grid>
                <Grid xs={3} item>
                    <br />
                    <br />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => window.location.reload()}>Refresh</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Title
