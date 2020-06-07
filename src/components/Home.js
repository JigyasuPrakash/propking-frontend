import React, { Component } from 'react';
import Section from './Section';
import Title from './Title';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: undefined
        }
    }

    componentDidMount() {
        const dev = 'http://localhost:7777/api/getproject/12345';
        //const prod = '/api/getproject/12345';
        // API call here
        axios.get(dev).then((response) => {
            this.setState({
                project: response.data
            });
        })
    }

    render() {
        return (
            this.state.project === undefined ? (
                <Link to="/builder"><Button variant="contained">Go to Builder</Button></Link>
            ) : (
                    <div>
                        <Title name={this.state.project.name} location={this.state.project.location} logo={this.state.project.logo} />
                        <Section project={this.state.project} />
                    </div>
                )
        )
    }
}

export default Home
