import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LeftSection from './Section/LeftSection';
import MiddleSection from './Section/MiddleSection';
import RightSection from './Section/RightSection';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import PaymentModal from './Modal/PaymentModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    grid: {
        margin: "18px"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

function Section({ project }) {
    const classes = useStyles();

    const [filteredTower, myFilter] = React.useState(project.tower);
    const handleTowerFilter = (info) => {
        let data = project.tower.filter((t) => {
            return info.includes(t.TID);
        });
        if (data.length === 0) {
            data = project.tower;
        }
        myFilter(data);
    }

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [areaArray, updateArea] = React.useState([]);
    const handleAreaFilter = (info) => {
        let data = areaArray;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info });
        } else {
            data.push(info);
            forceUpdate();
        }
        updateArea(data);
    }

    const [unit, changeUnit] = React.useState();

    const [open, switchModal] = React.useState(false);
    const handleModalOpen = () => {
        switchModal(true);
    }
    const handleModalClose = () => {
        switchModal(false);
    }

    return (
        <Grid container justify="space-evenly">
            <Grid item sm xs={12} className={classes.grid}>
                <Paper elevation={3} >
                    <LeftSection tower={project.tower} unitInfo={project.unitInfo} areaFilter={handleAreaFilter} towerFilter={handleTowerFilter} />
                </Paper>
            </Grid>

            <Grid item sm={6} xs={12} className={classes.grid}>
                <Paper elevation={3}>
                    <MiddleSection tower={filteredTower} areaFilter={areaArray} unitSelect={changeUnit} />
                </Paper>
            </Grid>

            <Grid item sm xs={12} className={classes.grid}>
                <Paper elevation={3} >
                    <RightSection myUnit={unit} handleModal={handleModalOpen} />
                </Paper>
            </Grid>

            {/* Payment Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <PaymentModal open={open} />
            </Modal>
        </Grid>
    );
}

export default Section;