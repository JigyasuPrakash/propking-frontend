import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/core/Checkbox';

function MyCheckBox({ data, filter }) {

    const [state, setState] = React.useState({ checked: false });
    const handleCheckBox = (event) => {
        setState(prevState => ({ checked: !prevState.checked }));
        filter(data.area);
    }

    return (
        data === undefined ? null : (
            <FormControlLabel
                control={<CheckBox checked={state.checked} onChange={handleCheckBox} color="primary" />}
                label={<Typography>{data.area} {data.unit}</Typography>}
                style={{ margin: "2px" }}
            />
        )
    )
}

export default MyCheckBox
