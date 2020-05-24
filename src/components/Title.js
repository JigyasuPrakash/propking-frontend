import React from 'react';
import Typography from '@material-ui/core/Typography';

function Title(props) {

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
            <img src="https://s3-ap-southeast-1.amazonaws.com/sqy/commonbookingdocs/logo_godrej_properties.jpeg" style={styling.img} alt="logo" />
            <Typography variant="h6">{props.name}</Typography>
            <Typography>{props.location}</Typography>
        </div>
    )
}

export default Title
