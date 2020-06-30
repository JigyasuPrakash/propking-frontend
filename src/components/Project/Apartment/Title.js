import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function Title({ name, location, logo, refresh }) {

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
                    <img src={logo} style={styling.img} alt="logo" />
                    <Typography variant="h6">{name}</Typography>
                    <Typography>{location}</Typography>
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
