import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function RightPreview({ myUnit, handleModal }) {
    return (
        myUnit === undefined ?
            (
                <React.Fragment>
                    <Typography variant="h6" style={{ padding: "10px" }}>Click on any House to view Price options</Typography>
                </React.Fragment>
            ) :
            (
                <center style={{ padding: "10px" }}>
                    <Typography variant="h6" align="center">FlatID: {myUnit.uid}</Typography>
                    <img src={myUnit.g_img_set} height="200px" alt="Apartment" style={{ border: "1px solid black" }} />
                    <br />
                    <Typography variant="subtitle1" align="center">{myUnit.bhk_type} BHK ({myUnit.size} Sq.Ft.)</Typography>
                    <Typography variant="subtitle1" align="center">{myUnit.no_of_balconies} Balconies</Typography>
                    <br />
                    <Button onClick={() => handleModal(myUnit)} variant="outlined" color="primary">Book Now</Button>
                </center>
            )
    )
}

export default RightPreview
