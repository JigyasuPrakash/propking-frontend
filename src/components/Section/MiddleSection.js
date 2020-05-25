import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Matrix from './Matrix'

const useStyles = makeStyles((theme) => ({
    div: {
        alignItems: "center"
    }
}))

function MiddleSection({ tower }) {

    const styling = useStyles();

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    }

    return (tower === undefined ? null : (
        <div className={styling.div}>
            <Matrix tower={tower[page - 1]} />
            <br />
            <Pagination count={tower.length} page={page} onChange={handleChange} color="primary" />
            <br />
        </div>
    ))
}

export default MiddleSection
