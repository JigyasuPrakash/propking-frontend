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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { domain } from '../../config';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

class ExistingProject extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projects: undefined,
            table: undefined,
            pname: "",
            type: "",
            isA: ""
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

    getLead = (pid, pname) => {
        axios.post(`${domain}/api/builder/getlead`, { pid })
            .then((response) => {
                if (response.data.status === "done") {
                    this.setState({ table: response.data.result, pname, type: "lead", isA: "Leads" });
                } else {
                    alert("Can't fetch results!");
                }
            })
            .catch((err) => {
                console.error("Somthing went wrong", err);
                alert("Somthing went wrong");
            })
    }

    getPayment = (pid, pname) => {
        axios.post(`${domain}/api/builder/getpayment`, { pid })
            .then((response) => {
                if (response.data.status === "done") {
                    this.setState({ table: response.data.result, pname, type: "payment", isA: "Payment Records" });
                } else {
                    alert("Can't fetch results!");
                }
            })
            .catch((err) => {
                console.error("Somthing went wrong", err);
                alert("Somthing went wrong");
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
                                                size="small">View</Button>
                                        </Link>) : p.type === "plot" ? (
                                            <Link to={`/project/p/${p.pid}`} style={{ textDecoration: "none" }}>
                                                <Button
                                                    size="small">View</Button>
                                            </Link>) : null}
                                    <Button
                                        onClick={() => this.getLead(p.pid, p.pname)}
                                        size="small">Leads</Button>
                                    <Button
                                        onClick={() => this.getPayment(p.pid, p.pname)}
                                        size="small">Payment</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <br />
                {this.state.table === undefined ? null : (
                    <div style={{ margin: "25px" }}>
                        <TableContainer component={Paper}>
                            <Typography style={{ margin: "10px" }} variant="h5" align="center">{this.state.pname} ({this.state.isA})</Typography>
                            <Table size="medium" aria-label="simple table">
                                {this.state.type === "lead" && (
                                    <React.Fragment>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>S No.</TableCell>
                                                <TableCell>Unit No.</TableCell>
                                                <TableCell>Customer Name</TableCell>
                                                <TableCell>Customer Phone</TableCell>
                                                <TableCell>Agent Name</TableCell>
                                                <TableCell style={{ minWidth: "250px" }} align="center">Comments</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.table.map(i => (
                                                <TableRow key={i.refid}>
                                                    <TableCell>{Number(this.state.table.indexOf(i)) + 1}</TableCell>
                                                    <TableCell>{i.unit_no}</TableCell>
                                                    <TableCell>{i.customer_name}</TableCell>
                                                    <TableCell>{i.phone}</TableCell>
                                                    <TableCell>{i.agent_name}</TableCell>
                                                    <TableCell style={{ minWidth: "250px" }}>{i.comments}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </React.Fragment>
                                )}
                                {this.state.type === "payment" && (
                                    <React.Fragment>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>S No.</TableCell>
                                                <TableCell>Unit No.</TableCell>
                                                <TableCell>Customer Name</TableCell>
                                                <TableCell>Customer Phone</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Payment Mode</TableCell>
                                                <TableCell>Reference No</TableCell>
                                                <TableCell>Agent Name</TableCell>
                                                <TableCell style={{ minWidth: "250px" }} align="center">Comments</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.table.map(i => (
                                                <TableRow key={i.refid}>
                                                    <TableCell>{Number(this.state.table.indexOf(i)) + 1}</TableCell>
                                                    <TableCell>{i.unit_no}</TableCell>
                                                    <TableCell>{i.customer_name}</TableCell>
                                                    <TableCell>{i.phone}</TableCell>
                                                    <TableCell>{i.amount}</TableCell>
                                                    <TableCell>{i.payment_opt}</TableCell>
                                                    <TableCell>{i.reference_no}</TableCell>
                                                    <TableCell>{i.agent_name}</TableCell>
                                                    <TableCell style={{ minWidth: "250px" }}>{i.comments}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </React.Fragment>
                                )}
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </React.Fragment>)
        )
    }
}

export default ExistingProject
