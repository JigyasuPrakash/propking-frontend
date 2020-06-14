import React, { Component } from 'react';
import Section from './Section/Section';
import Title from './Title';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Header from './Header/Header';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: undefined
        }
    }

    componentDidMount() {
        const dev = 'https://propking.herokuapp.com/api/getproject/' + window.location.pathname.split('/')[2];
        axios.get(dev).then((response) => {
            console.log(response.data)
            if (response.data.status === "failed") {
                console.log("Failed")
                this.setState({ project: undefined });
            } else {
                console.log("Success");
                this.setState({ project: response.data });
            }
        })
    }

    render() {
        return (
            this.state.project === undefined ? (
                <Link to="/builder"><Button variant="contained">Go to Builder</Button></Link>
            ) : (
                    <div>
                        <Header />
                        <Title name={this.state.project.name} location={this.state.project.location} logo={this.state.project.img_set} />
                        <Section project={this.state.project} />
                    </div>
                )
        )
    }
}

export default Home
