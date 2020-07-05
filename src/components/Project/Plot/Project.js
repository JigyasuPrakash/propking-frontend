import React, { Component } from 'react';
import Section from './Section';
import Title from './Title';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { domain } from '../../../config';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: undefined,
            customer: undefined,
            leadcount: []
        }
    }

    componentDidMount() {
        const url = `${domain}/api/public/getproject/p/` + window.location.pathname.split('/')[3];
        axios.get(url)
            .then((response) => {
                if (response.data.status === "failed") {
                    alert("Can't fetch results");
                    this.setState({ project: undefined });
                } else {
                    this.setState({ project: response.data.result, leadcount: response.data.leadcount });
                }
            })
            .catch((err) => {
                console.error("Something went wrong", err);
            })
    }

    fetchBookedPlot = (unit) => {
        axios.post(`${domain}/api/public/getcustomer`, { pid: this.state.project.pid, uid: unit.uid })
            .then((response) => {
                if (response.data.status === "done") {
                    this.setState({ customer: response.data.result });
                } else {
                    alert("Somthing went wrong");
                }
            })
    }

    customerResponse = (type, data) => {
        axios.post(`${domain}/api/public/p/response`, {
            pid: this.state.project.pid,
            type,
            data
        }).then((response) => {
            if (response.data.status === "done") {
                window.location.reload();
                alert("Response saving: Success \nReference Id: " + response.data.refid);
            } else {
                alert("Response saving: Failed, Please try again later");
            }
        }).catch((err) => {
            console.error("Somthing went wrong!", err);
        })
    }

    render() {
        return (
            this.state.project === undefined ? (
                <Backdrop open={true}>
                    <CircularProgress color="secondary" />
                </Backdrop>
            ) : (
                    <div>
                        <Title
                            name={this.state.project.name}
                            location={this.state.project.location}
                            logo={this.state.project.img_set} />
                        <Section
                            project={this.state.project}
                            response={this.customerResponse}
                            fetchBookedPlot={this.fetchBookedPlot}
                            customer={this.state.customer}
                            leadcount={this.state.leadcount} />
                    </div>
                )
        )
    }
}

export default Home
