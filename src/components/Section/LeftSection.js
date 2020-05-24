import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ApartmentIcon from '@material-ui/icons/Apartment';
import MyCheckBox from './MyCheckBox';

function LeftSection({ tower, unitInfo }) {

    const [formats, setFormats] = React.useState(() => []);
    const handleChange = (event, newFormats) => {
        setFormats(newFormats);
    }

    const icons = tower === undefined ? null : tower.map(item => (
        <ToggleButton key={item} value={item} aria-label={item} style={{ margin: "10px" }}>
            <ApartmentIcon color="primary" fontSize="large" />
            <Typography variant="button" style={{ color: "black" }}>{item}</Typography>
        </ToggleButton>
    ));

    const createUnitInfo = unitInfo === undefined ? null : unitInfo.map(item => (
        <MyCheckBox key={item.id} data={item} />
    ))

    return (
        <Grid container>
            <Grid item xs style={{ borderRight: "1px lightgrey solid" }}>
                <ToggleButtonGroup orientation="vertical" value={formats} onChange={handleChange} aria-label="apartments" style={{ margin: "5px", }}>
                    {icons}
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" style={{ borderBottom: "1px lightGrey solid", margin: "10px" }} align="center">Unit Type</Typography>
                {createUnitInfo}
            </Grid>
        </Grid>
    )
}

export default LeftSection
