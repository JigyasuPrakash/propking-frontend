import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { domain } from '../config';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projects: undefined
        }
    }

    componentDidMount() {
        axios.get(`${domain}/api/public/getallprojects`)
            .then((response) => {
                if (response.data.status === 'failed') {
                    this.setState({ projects: '' });
                } else {
                    this.setState({ projects: response.data.result });
                }
            })
            .catch(err => {
                this.setState({ projects: '' });
                console.error("Something went wrong: ", err);
            })
    }

    render() {
        return (
            this.state.projects === undefined ? (
                <Backdrop open={true}>
                    <CircularProgress color="secondary" />
                </Backdrop>
            ) : this.state.projects === '' ? (
                <center>Somthing went wrong</center>
            ) : (<React.Fragment>
                <Typography variant="h5" style={{ margin: "18px" }}>All Projects</Typography>
                <Grid container justify="flex-start">
                    {this.state.projects.map(p => (
                        <Grid item xs={2} style={{ margin: "10px" }} key={p.pid}>
                            <Card variant="elevation">
                                <CardContent>
                                    <Typography variant="h6">{p.pname}</Typography>
                                </CardContent>
                                <CardActions>
                                    {p.type === "apartment" ? (
                                        <Link to={`/project/a/${p.pid}`} style={{ textDecoration: "none" }}>
                                            <Button
                                                size="small">
                                                View
                                            </Button>
                                        </Link>) : p.type === "plot" ? (
                                            <Link to={`/project/p/${p.pid}`} style={{ textDecoration: "none" }}>
                                                <Button
                                                    size="small">
                                                    View
                                            </Button>
                                            </Link>) : null}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <br />
                <br />
                <center>
                    <Link to="/builder" style={{ textDecoration: "none" }}><Button variant="contained" color="primary">Builder's Dashboard</Button></Link>
                </center>
            </React.Fragment>)
        )
    }
}

export default Home
