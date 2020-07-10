import React, { Component } from 'react';
import Section from './Section';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { domain } from '../../../../config';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: undefined,
            url: ""
        }
    }

    componentDidMount() {
        let pid = window.localStorage.getItem('pid');
        let blocks = JSON.parse(window.localStorage.getItem('blocks'));
        let unitInfo = JSON.parse(window.localStorage.getItem('unitInfo'));
        let attributeInfo = JSON.parse(window.localStorage.getItem('attributeInfo'));
        let facingInfo = JSON.parse(window.localStorage.getItem('facingInfo'));
        this.setState({
            project: { pid, blocks, unitInfo, attributeInfo, facingInfo },
        });
    }

    publish = () => {
        axios.post(`${domain}/api/builder/p/publish`, {
            pid: this.state.pid
        }).then((response) => {
            this.setState({ url: response.data.url });
            alert("Project Publishing: " + response.data.status);
        }).catch((err) => {
            console.log("Something went wrong", err);
        })
    }

    publishedLink = () => {
        if (this.state.url === '') {
            return null;
        } else {
            return (
                <Button
                    contained
                    variant="outlined"
                    color="primary"
                    onClick={() => window.open(this.state.url)}
                    style={{ margin: "12px" }}>
                    Link
                </Button>
            )
        }
    }

    render() {
        return (
            this.state.project === undefined ? (
                <Backdrop open={true}>
                    <CircularProgress color="secondary" />
                </Backdrop>
            ) : (
                    <div>
                        <center>
                            <Button
                                variant="contained"
                                onClick={() => window.close()}
                                style={{ margin: "12px" }}
                            >Close</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.publish}
                                style={{ margin: "12px" }}
                            >Publish</Button>
                            {this.publishedLink()}
                        </center>
                        <Section
                            project={this.state.project} />
                    </div>
                )
        )
    }
}

export default Home
