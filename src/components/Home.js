import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <center>
            <Link to="/user/12346"><Button variant="contained" color="primary" style={{ margin: "20px" }}>User Section</Button></Link>
            <Link to="/builder"><Button variant="contained" color="primary" style={{ margin: "20px" }}>Builder Section</Button></Link>
        </center>
    )
}

export default Home
