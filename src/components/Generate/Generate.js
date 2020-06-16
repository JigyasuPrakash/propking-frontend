import React, { Component } from 'react'
import GenerateMatrix from './GenerateMatrix';
import axios from 'axios';
import Header from '../Header/Header';
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class Preview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        const pid = window.location.pathname.split('/')[2];
        if (this.props.location.towers !== undefined) {
            console.log("found")
            this.setState({
                loaded: true,
                pid: pid,
                towers: this.props.location.towers,
                unitInfo: this.props.location.unitInfo,
                uniqueAtt: this.props.location.uniqueAtt,
                facing: this.props.location.facing
            })
        } else {
            axios.get(`https://propking.herokuapp.com/api/builder/getproject/${pid}`).then((response) => {
                this.setState({
                    loaded: true,
                    pid: pid,
                    towers: response.data.towers,
                    unitInfo: response.data.unitInfo,
                    uniqueAtt: response.data.uniqueAtt,
                    facing: response.data.facing
                });
            }).catch((err) => {
                console.error("Something went wrong", err);
            })
        }
    }

    preview = () => {
        window.localStorage.setItem('pid', this.state.pid);
        window.localStorage.setItem('towers', JSON.stringify(this.state.towers));
        window.localStorage.setItem('unitInfo', JSON.stringify(this.state.unitInfo));
        window.open(`/preview/${this.state.pid}`, "_blank");
    }



    save = (project) => {
        // axios.post('https://propking.herokuapp.com/api/builder/save', {
        //     pid: this.state.pid,
        //     towers: project.towers,
        //     unitInfo: this.state.unitInfo,
        //     uniqueAtt: this.state.uniqueAtt,
        //     facing: this.state.facing
        // }).then((response) => {
        //     alert("Project saving: " + response.data.status);
        // }).catch((err) => {
        //     console.error("Something went wrong", err)
        // })
        console.log(project)
    }

    render() {
        return (
            this.state.loaded === false ? (
                <Backdrop open={true}>
                    <CircularProgress color="primary" />
                </Backdrop>
            ) :
                this.state.towers === undefined ? <Redirect to="/builder" /> : (
                    <div>
                        <Header publish={this.publish} />
                        <GenerateMatrix
                            towers={this.state.towers}
                            facing={this.state.facing}
                            unitInfo={this.state.unitInfo}
                            uniqueAtt={this.state.uniqueAtt}
                            save={this.save}
                            preview={this.preview}
                        />
                    </div >
                )
        )
    }
}

export default Preview;
