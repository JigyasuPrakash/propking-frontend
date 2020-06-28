import React from 'react';
import Typography from '@material-ui/core/Typography';

function Title({ name, location, logo }) {

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
            <img src={logo} style={styling.img} alt="logo" />
            <Typography variant="h6">{name}</Typography>
            <Typography>{location}</Typography>
        </div>
    )
}

export default Title
