import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <center>
            <Link
                to="/getall"
                style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "20px" }}>
                    Existing Projects
                      </Button>
            </Link>
            <Link
                to="/builder"
                style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "20px" }}>
                    Create new Project
                     </Button>
            </Link>
        </center>
    )
}

export default Home
