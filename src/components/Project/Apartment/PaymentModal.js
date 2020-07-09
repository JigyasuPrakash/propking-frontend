import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

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
                    <Typography variant="h6" align="center">Floor Plan</Typography>
                    <br />
                    <img src={unit.g_img_set} alt="Floor Plan" />
                </div>
            </Fade>
        )
    )
}

export default PaymentModal
