import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/core/Checkbox';

function FlatTypeOptions({ data, filter }) {

    const [state, setState] = React.useState({ checked: false });
    const handleCheckBox = (event) => {
        setState(prevState => ({ checked: !prevState.checked }));
        filter(data);
    }

    return (
        data === undefined ? null : (
            <React.Fragment>
                <FormControlLabel
                    control={<CheckBox checked={state.checked} onChange={handleCheckBox} color="primary" />}
                    label={<Typography>{data}</Typography>}
                /><br />
            </React.Fragment>
        )
    )
}

export default FlatTypeOptions;
