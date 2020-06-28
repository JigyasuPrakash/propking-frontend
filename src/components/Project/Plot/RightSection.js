import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function RightSection({ myUnit, handleModal }) {
    return (
        myUnit.uid === "" ?
            (
                <React.Fragment>
                    <Typography variant="h6" style={{ padding: "10px" }}>Click on any Plot to view Price options</Typography>
                </React.Fragment>
            ) :
            (
                <center style={{ padding: "10px" }}>
                    <Typography variant="h6" align="center">Plot No. {myUnit.unit_no}</Typography>
                    <img src={myUnit.g_img_set} height="200px" alt="Apartment" style={{ border: "1px solid black" }} />
                    <br />
                    <Typography variant="subtitle1" align="center">{myUnit.size} Sq.Yds.</Typography>
                    <br />
                    <Button onClick={() => handleModal(myUnit)} variant="outlined" color="primary">Book Now</Button>
                </center>
            )
    )
}

export default RightSection
