import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import MyCheckBox from './MyCheckBox';

function LeftSection({ tower, unitInfo, areaFilter, towerFilter, attributes, facing }) {

    const [formats, setFormats] = React.useState(() => []);
    const handleChange = (event, newFormats) => {
        setFormats(newFormats);
        towerFilter(newFormats);
    }

    const icons = tower === undefined ? null : tower.map(item => (
        <ToggleButton key={item.tid} value={item.tid} aria-label={item.tid} style={{ margin: "5px", border: "0.5px grey solid" }}>
            <ViewWeekIcon color="primary" fontSize="large" />
            <Typography variant="button" style={{ color: "black" }}>{item.bname}</Typography>
        </ToggleButton>
    ));

    const createUnitInfo = unitInfo === undefined ? null : unitInfo.map(item => (
        <React.Fragment key={item.id}>
            <MyCheckBox
                type="unit"
                data={item}
                filter={areaFilter} />
            <br />
        </React.Fragment>
    ));

    const createAttribute = attributes === undefined ? null : attributes.map(item => (
        <React.Fragment key={item.attribute}>
            <MyCheckBox
                type="attribute"
                data={item.attribute}
                filter={areaFilter} />
            <br />
        </React.Fragment>
    ));

    const createFacing = facing === undefined ? null : facing.map(item => (
        <React.Fragment key={item.facing}>
            <MyCheckBox
                type="facing"
                data={item.facing}
                filter={areaFilter} />
            <br />
        </React.Fragment>
    ));

    return (
        <React.Fragment>
            <Grid container justify="center">
                <Grid item sm={12}>
                    <Typography variant="h6" style={{ margin: "10px" }} align="center">Blocks:</Typography>
                    <center>
                        <ToggleButtonGroup orientation="vertical" value={formats} onChange={handleChange} aria-label="apartments" style={{ margin: "5px", }}>
                            {icons}
                        </ToggleButtonGroup>
                    </center>
                </Grid>
            </Grid>
            <Grid container justify="center" style={{ borderTop: "1px solid lightgrey" }}>
                <Grid item sm={12}>
                    <Typography variant="h6" style={{ margin: "10px" }} align="center">Unit Type</Typography>
                    {createUnitInfo}
                </Grid>
            </Grid>
            {attributes.length !== 0 && (
                <Grid container justify="center" style={{ borderTop: "1px solid lightgrey" }}>
                    <Grid item sm={12}>
                        <Typography variant="h6" style={{ margin: "10px" }} align="center">Attributes</Typography>
                        {createAttribute}
                    </Grid>
                </Grid>
            )}
            <Grid container justify="center" style={{ borderTop: "1px solid lightgrey" }}>
                <Grid item sm={12}>
                    <Typography variant="h6" style={{ margin: "10px" }} align="center">Facing</Typography>
                    {createFacing}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default LeftSection
