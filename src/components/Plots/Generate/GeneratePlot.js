import React, { Component } from 'react'
import GenerateMatrix from './GenerateMatrix';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { domain } from '../../../config';

class GeneratePlot extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            blocks: undefined
        }
    }

    componentDidMount() {
        const pid = window.location.pathname.split('/')[3];
        if (this.props.location.blocks !== undefined) {
            this.setState({
                loaded: true,
                pid,
                pname: this.props.location.pname,
                blocks: this.props.location.blocks,
                unitInfo: this.props.location.unitInfo,
                uniqueAtt: this.props.location.uniqueAtt,
                facing: this.props.location.facing
            })
        } else {
            axios.get(`${domain}/api/builder/getproject/${pid}`).then((response) => {
                if (response.data.status === "failed") {
                    alert("Somthing went wrong");
                } else {
                    this.setState({
                        loaded: true,
                        pid,
                        pname: response.data.project.pname,
                        blocks: response.data.project.main,
                        unitInfo: response.data.project.unitInfo,
                        uniqueAtt: response.data.project.uniqueAtt,
                        facing: response.data.project.facing
                    });
                }
            }).catch((err) => {
                console.error("Something went wrong", err);
            })
        }
    }

    preview = (project) => {
        this.save(project);
        let count = 0;
        project.forEach(t => {
            t.floors.forEach(f => {
                f.units.forEach(u => {
                    if (u.bhk_type === "" || u.size === 0 || u.facing === "") {
                        count++;
                    }
                })
            })
        })
        if (count > 0) {
            alert(count + " Flat(s) has missing mandatory attributes");
        } else {
            window.localStorage.setItem('pid', this.state.pid);
            window.localStorage.setItem('blocks', JSON.stringify(project));
            window.localStorage.setItem('unitInfo', JSON.stringify(this.state.unitInfo));
            window.open(`/preview/${this.state.pid}`, "_blank");
        }
    }

    save = (project) => {
        axios.post(`${domain}/api/builder/save`, {
            pid: this.state.pid,
            pname: this.state.pname,
            type: "plot",
            main: project,
            unitInfo: this.state.unitInfo,
            uniqueAtt: this.state.uniqueAtt,
            facing: this.state.facing
        }).then((response) => {
            alert("Project saving: " + response.data.status);
        }).catch((err) => {
            console.error("Something went wrong", err)
        })
        console.log(project)
    }

    render() {
        return (
            !this.state.loaded ? (
                <Backdrop open={true}>
                    <CircularProgress color="secondary" />
                </Backdrop>
            ) : this.state.blocks === undefined ? <Redirect to="/builder" /> : (
                <GenerateMatrix
                    blocks={this.state.blocks}
                    facing={this.state.facing}
                    unitInfo={this.state.unitInfo}
                    uniqueAtt={this.state.uniqueAtt}
                    save={this.save}
                    preview={this.preview}
                />
            )
        )
    }
}

export default GeneratePlot;