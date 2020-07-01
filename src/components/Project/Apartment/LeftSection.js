import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ApartmentIcon from '@material-ui/icons/Apartment';
import MyCheckBox from './MyCheckBox';

function LeftSection({ tower, unitInfo, areaFilter, towerFilter }) {

    const [formats, setFormats] = React.useState(() => []);
    const handleChange = (event, newFormats) => {
        setFormats(newFormats);
        towerFilter(newFormats);
    }

    const icons = tower === undefined ? null : tower.map(item => (
        <center>
            <ToggleButton key={item.tid} value={item.tid} aria-label={item.tid} style={{ margin: "8px" }}>
                <ApartmentIcon color="primary" fontSize="default" />
                <Typography variant="button" style={{ color: "black" }}>{item.tname}</Typography>
            </ToggleButton><br />
        </center>
    ));

    const createUnitInfo = unitInfo === undefined ? null : unitInfo.map(item => (
        <MyCheckBox key={item.id} data={item} filter={areaFilter} />
    ))

    return (
        <React.Fragment>
            <Grid container justify="center">
                <Grid item sm={12}>
                    <Typography variant="h6" style={{ margin: "10px" }} align="center">Towers:</Typography>
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
                    <center>
                        {createUnitInfo}
                    </center>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default LeftSection
