import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LeftSection from './LeftSection';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import PaymentModal from './PaymentModal';

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: "15px"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function Section({ project, response, fetchBookedPlot, customer, leadcount }) {
    const classes = useStyles();

    const [filteredTower, myFilter] = React.useState(project.blocks);
    const handleTowerFilter = (info) => {
        let data = project.blocks.filter((t) => {
            return info.includes(t.tid);
        });
        if (data.length === 0) {
            data = project.blocks;
        }
        myFilter(data);
    }

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [areaArray, updateArea] = React.useState([]);
    const [facingArray, updateFacing] = React.useState([]);
    const [attributeArray, updateAttribute] = React.useState([]);
    const handleAreaFilter = (type, info) => {
        let data;
        if (type === "unit") {
            data = areaArray;
            if (data.includes(info)) {
                data = data.filter(a => { return a !== info });
            } else {
                data.push(info);
                forceUpdate();
            }
            updateArea(data);
        } else if (type === "facing") {
            data = facingArray;
            if (data.includes(info)) {
                data = data.filter(a => { return a !== info });
            } else {
                data.push(info);
                forceUpdate();
            }
            updateFacing(data);
        } else if (type === "attribute") {
            data = attributeArray;
            if (data.includes(info)) {
                data = data.filter(a => { return a !== info });
            } else {
                data.push(info);
                forceUpdate();
            }
            updateAttribute(data);
        }

    }

    const [unit, changeUnit] = React.useState({ uid: "" });
    const handleUnitSelect = (myUnit) => {
        if (unit.uid === myUnit.uid) {
            changeUnit({ uid: "" });
        } else {
            changeUnit(myUnit);
        }
        if (myUnit.status === "booked") {
            fetchBookedPlot(myUnit)
        }
    }

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
                    <LeftSection
                        tower={project.blocks}
                        unitInfo={project.unitInfo}
                        attributes={project.attributeInfo}
                        facing={project.facingInfo}
                        areaFilter={handleAreaFilter}
                        towerFilter={handleTowerFilter} />
                </Paper>
            </Grid>

            <Grid item sm={7} xs={12} className={classes.grid}>
                <MiddleSection
                    tower={filteredTower}
                    areaFilter={areaArray}
                    facingFilter={facingArray}
                    attributeFilter={attributeArray}
                    unitSelect={handleUnitSelect}
                    selected={unit}
                    leadcount={leadcount} />
            </Grid>

            <Grid item sm xs={12} className={classes.grid}>
                <Paper elevation={3} >
                    <RightSection
                        myUnit={unit}
                        handleModal={handleModalOpen}
                        response={response}
                        customer={customer} />
                </Paper>
            </Grid>

            {/* Payment Modal */}
            <div>
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
                    <PaymentModal unit={unit} open={open} />
                </Modal>
            </div>
        </Grid>
    );
}

export default Section;