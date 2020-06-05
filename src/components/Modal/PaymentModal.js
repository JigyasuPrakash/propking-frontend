import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

function PaymentModal({ unit, open }) {

    const classes = useStyles();

    return (
        unit === undefined ? null : (
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h6" align="center">FlatID: {unit.uid}</Typography>
                    <br />
                    <Typography variant="subtitle1" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography>
                    <Typography variant="subtitle1" align="center">{unit.no_of_balconies} Balconies</Typography>
                    <br />
                    <Button variant="outlined" color="primary">Proceed with Payment</Button>
                </div>
            </Fade>
        )
    )
}

export default PaymentModal
