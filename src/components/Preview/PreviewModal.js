import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: "18px"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

function PreviewModal({ unit, open, handleModalClose }) {

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}>
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography variant="h6" align="center">FlatID: {unit.uid}</Typography>
                    <br />
                    <Typography variant="subtitle1" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography>
                    <br />
                    <Button variant="outlined" color="primary">Proceed with Payment</Button>
                </div>
            </Fade>
        </Modal>
    )
}

export default PreviewModal
