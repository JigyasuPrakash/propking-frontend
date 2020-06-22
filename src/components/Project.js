import React, { Component } from 'react';
import Section from './Section/Section';
import Title from './Title';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { domain } from '../config';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: undefined
        }
    }

    componentDidMount() {
        const url = `${domain}/api/getproject/` + window.location.pathname.split('/')[2];
        axios.get(url).then((response) => {
            console.log(response.data)
            if (response.data.status === "failed") {
                console.log("Failed")
                this.setState({ project: undefined });
            } else {
                console.log("Success");
                this.setState({ project: response.data.result });
            }
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
                        <Title name={this.state.project.name} location={this.state.project.location} logo={this.state.project.img_set} />
                        <Section project={this.state.project} />
                    </div>
                )
        )
    }
}

export default Home
