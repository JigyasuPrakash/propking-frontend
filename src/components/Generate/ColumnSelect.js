import React from 'react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';

function ColumnSelect({ units, filter, state, click }) {

    const handleCheck = () => {
        filter('U' + units.uid.split('U')[1], !state);
        click(units.uid.split('U')[1] - 1);
    }

    return (
        <FormControlLabel
            control={<CheckBox checked={state} onChange={handleCheck} color="primary" />}
            label={<ArrowDownIcon />}
        />
    )
}

export default ColumnSelect
