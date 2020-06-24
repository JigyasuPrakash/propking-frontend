import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}))

function PaymentModal({ unit, open }) {

    const classes = useStyles();

    return (
        unit === undefined ? null : (
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h6" align="center">FlatNo: {unit.unit_no}</Typography>
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
