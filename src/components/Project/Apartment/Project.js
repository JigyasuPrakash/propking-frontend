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
            loader: false
        }
    }

    componentDidMount() {
        this.setState({ loader: true });
        const url = `${domain}/api/public/getproject/a/` + window.location.pathname.split('/')[3];
        axios.get(url).then((response) => {
            if (response.data.status === "failed") {
                alert("Can't fetch results");
                this.setState({ project: undefined });
            } else {
                this.setState({ project: response.data.result, loader: false });
            }
        })
    }

    refresh = () => {
        this.setState({ loader: true });
        const url = `${domain}/api/public/getproject/a/` + window.location.pathname.split('/')[3];
        axios.get(url).then((response) => {
            if (response.data.status === "failed") {
                alert("Can't fetch results");
                this.setState({ project: undefined });
            } else {
                this.setState({ project: response.data.result, loader: false });
            }
        })
    }

    customerResponse = (type, data) => {
        axios.post(`${domain}/api/public/response`, {
            pid: this.state.project.pid,
            type,
            data
        }).then((response) => {
            if (response.data.status === "done") {
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
                            logo={this.state.project.img_set}
                            refresh={this.refresh} />
                        <Section
                            project={this.state.project}
                            response={this.customerResponse} />
                        <Backdrop open={this.state.loader} style={{
                            zIndex: 1,
                            color: '#fff'
                        }}>
                            <CircularProgress color="secondary" />
                        </Backdrop>
                    </div>
                )
        )
    }
}

export default Home
