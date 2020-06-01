import React, { Component } from 'react';
import Section from './Section';
import Title from './Title';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: undefined
        }
    }

    componentDidMount() {
        // API call here
        axios.get('http://localhost:7777/getproject/12345').then((response) => {
            this.setState({
                project: response.data
            });
            console.log(response.data)
        })
    }

    render() {
        return (
            this.state.project === undefined ? null : (
                <div>
                    <Title name={this.state.project.name} location={this.state.project.location} />
                    <Section project={this.state.project} />
                </div>
            )
        )
    }
}

export default Home
