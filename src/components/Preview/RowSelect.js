import React from 'react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function RowSelect({ floor, filter }) {

    const [check, setCheck] = React.useState(false);
    const handleCheck = () => {
        filter(floor.fid)
        setCheck(prevState => !prevState);
    }

    return (
        <FormControlLabel
            control={<CheckBox checked={check} onChange={handleCheck} color="primary" />}
            label={`Floor ${floor.floor_no}`}
        />
    )
}

export default RowSelect
