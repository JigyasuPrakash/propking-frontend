import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Matrix from './Matrix'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    div: {
        alignItems: "center"
    }
}))

function MiddleSection({ tower, areaFilter, facingFilter, attributeFilter, unitSelect, selected, leadcount }) {

    const styling = useStyles();

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    }

    return (tower === undefined ? (<CircularProgress />) : (
        <div className={styling.div}>
            <Matrix
                tower={tower[page - 1]}
                areafilter={areaFilter}
                facingFilter={facingFilter}
                attributeFilter={attributeFilter}
                mySelect={unitSelect}
                selected={selected}
                leadcount={leadcount} />
            <br />
            <Pagination count={tower.length} page={page} onChange={handleChange} color="primary" />
            <br />
        </div>
    ))
}

export default MiddleSection
