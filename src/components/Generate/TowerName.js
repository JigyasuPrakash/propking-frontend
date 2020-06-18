import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

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

function TowerName({ tower, update }) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    const handleRename = () => {
        update('tower', tower.tid, document.getElementById('newTname').value);
        closeModal();
    }

    return (
        <React.Fragment>
            <Typography variant="h5" style={{ borderBottom: "1px lightgrey solid", margin: "10px" }} align="center">
                {tower.tname} <IconButton size="medium" onClick={openModal}><EditIcon fontSize="small" /></IconButton>
            </Typography>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <center>
                            <input id="newTname" type="text" placeholder={tower.tname} /><br />
                            <Button variant="outlined" onClick={handleRename} color="primary">Done</Button>
                        </center>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

export default TowerName
