import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/core/Checkbox';

function MyCheckBox({ type, data, filter }) {

    const [state, setState] = React.useState({ checked: false });
    const handleCheckBox = (event) => {
        setState(prevState => ({ checked: !prevState.checked }));
        if (type === "unit") {
            filter(type, data.area);
        } else {
            filter(type, data);
        }
    }

    return (
        data === undefined ? null :
            type === "unit" ? (
                <FormControlLabel
                    control={<CheckBox checked={state.checked} onChange={handleCheckBox} color="primary" />}
                    label={<Typography>{data.landArea} Sq.Yds. - {data.type} - {data.bhk} BHK ({data.area} {data.unit})</Typography>}
                    style={{ margin: "2px" }}
                />
            ) : type === "attribute" ? (
                <FormControlLabel
                    control={<CheckBox checked={state.checked} onChange={handleCheckBox} color="primary" />}
                    label={<Typography>{data}</Typography>}
                    style={{ margin: "2px" }}
                />
            ) : type === "facing" ? (
                <FormControlLabel
                    control={<CheckBox checked={state.checked} onChange={handleCheckBox} color="primary" />}
                    label={<Typography>{data}</Typography>}
                    style={{ margin: "2px" }}
                />
            ) : null
    )
}

export default MyCheckBox
