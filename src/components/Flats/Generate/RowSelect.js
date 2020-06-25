import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

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

function RowSelect({ floor, filter, rename, state, click, floorValues }) {

    const classes = useStyles();

    const handleCheck = () => {
        filter(floor.fid, !state);
        click(floor.fid.split('F')[1] - 1);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const update = (type, id, value) => {
        rename(type, id, value);
        handleClose();
    }

    return (
        <React.Fragment>
            <div style={{ minWidth: "150px" }}>
                <FormControlLabel
                    control={
                        <CheckBox checked={state}
                            onChange={handleCheck}
                            color="primary" />
                    }
                    label={`Floor ${floor.floor_no}`}
                />
                <IconButton size="medium" onClick={handleOpen}><EditIcon fontSize="small" /></IconButton>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <center>
                            <Grid container justify="space-evenly">
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="newvalue"
                                        size="small"
                                        options={floorValues}
                                        fullWidth
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => <TextField {...params} size="small" fullWidth label="Floor" variant="outlined" />}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    update('floor', floor.fid, document.getElementById('newvalue').value)}
                                color="primary">
                                Done
                                </Button>
                        </center>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment >
    )
}

export default RowSelect
