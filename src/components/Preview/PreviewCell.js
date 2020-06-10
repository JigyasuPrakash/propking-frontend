import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function PreviewCell({ unit, variant, filter, color, disable, applyDisable }) {

    const [checked, setChecked] = React.useState(!unit.status);
    const toggleChecked = () => {
        setChecked((prev) => !prev);
        disable(unit.uid);
    }

    return (
        <Tooltip interactive arrow title={(
            <React.Fragment>
                <Typography variant="body2" align="center">FlatID: {unit.uid}</Typography>
                <FormControlLabel
                    control={<Switch size="small" checked={checked} onChange={toggleChecked} />}
                    label="Disable"
                /><br />
                <Typography variant="caption" align="center">{unit.bhk_type} BHK ({unit.size} Sq.Ft.)</Typography><br />
                <Typography variant="caption" align="center">Att: {unit.att}</Typography><br />
                <Typography variant="caption" aign="center">Face: {unit.facing}</Typography>
            </React.Fragment>
        )}>
            <Button id={unit.uid} onClick={() => filter(unit.uid)} variant={variant} color="primary"><HomeIcon style={{ color: color }} /></Button>
        </Tooltip>
    )
}

export default PreviewCell
