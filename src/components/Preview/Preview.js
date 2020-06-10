import React, { Component } from 'react';
import LeftPreview from './LeftPreview';
import MiddlePreview from './MiddlePreview';
import RightPreview from './RightPreview';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: undefined
        }
    }

    componentDidMount() {
        let project = this.props.location.project
        this.setState({ project });
    }

    publish = () => {
        axios.post('http://localhost:7777/api/builder/publish', {
            pid: this.state.pid
        }).then((response) => {
            alert("Project Publishing: " + response.data.status);
        }).catch((err) => {
            console.log("Something went wrong", err);
        })
    }

    render() {
        return (
            this.state.project === undefined ? (
                <Button variant="contained" onClick={() => window.close()}>Close</Button>
            ) : (
                    <div>
                        <LeftPreview tower={this.state.project.tower}  />
                        <MiddlePreview />
                        <RightPreview />
                    </div>
                )
        )
    }
}

export default Home
