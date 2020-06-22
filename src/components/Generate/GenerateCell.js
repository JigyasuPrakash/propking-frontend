import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import BlockIcon from '@material-ui/icons/Block';

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

function GenerateCell({ unit, variant, filter, color, disable, rename }) {

    const classes = useStyles();

    const [checked, setChecked] = React.useState(!unit.status);
    const toggleChecked = () => {
        setChecked((prev) => !prev);
        disable(unit.uid);
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
            <Tooltip interactive arrow title={(
                <React.Fragment>
                    <Typography variant="body2" align="center">FlatNo: {unit.unit_no}
                        <IconButton size="small" onClick={handleOpen}><EditIcon fontSize="small" /></IconButton>
                    </Typography>
                    <FormControlLabel
                        control={<Switch size="small" checked={checked} onChange={toggleChecked} />}
                        label="Remove"
                    /><br />
                    <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                    {unit.att === "" ? null : (
                        <React.Fragment>
                            <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                        </React.Fragment>)}
                    <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
                </React.Fragment>
            )}>
                {unit.status ? (
                    unit.att !== "" || unit.bhk_type !== "" || unit.facing !== "" ? (
                        <Button id={unit.uid} onClick={() => filter(unit.uid)} variant={variant} color="primary"><HomeIcon style={{ color: color }} /></Button>
                    ) : (
                            <Button id={unit.uid} onClick={() => filter(unit.uid)} variant={variant} color="secondary"><HomeIcon style={{ color: color }} /></Button>
                        ))
                    : (<Button id={unit.uid} onClick={() => filter(unit.uid)} variant={variant} color="secondary"><BlockIcon style={{ color: color }} /></Button>)
                }
            </Tooltip>

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
                            <input id="newname" type="text" placeholder="Flat No." /><br />
                            <Button variant="outlined" onClick={() => update('unit', unit.uid, document.getElementById('newname').value)} color="primary">Done</Button>
                        </center>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment >
    )
}

export default GenerateCell;
