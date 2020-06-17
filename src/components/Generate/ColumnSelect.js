import React from 'react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';

function ColumnSelect({ row, filter }) {

    const [check, setCheck] = React.useState(false);
    const handleCheck = () => {
        filter('U' + row.uid.split('U')[1], !check);
        setCheck(prevState => !prevState);
    }

    return (
        <FormControlLabel
            control={<CheckBox checked={check} onChange={handleCheck} color="primary" />}
            label={<ArrowDownIcon />}
        />
    )
}

export default ColumnSelect
