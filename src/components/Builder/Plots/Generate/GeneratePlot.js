import React, { Component } from 'react'
import GenerateMatrix from './GenerateMatrix';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { domain } from '../../../../config';
import Button from '@material-ui/core/Button';

class GeneratePlot extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            blocks: undefined,
            disabled: []
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
                facing: this.props.location.facing,
                disabled: []
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
                        facing: response.data.project.facing,
                        disabled: response.data.project.disabled
                    });
                }
            }).catch((err) => {
                console.error("Something went wrong", err);
            })
        }
    }

    preview = () => {
        this.save();
        let count = 0;
        this.state.blocks.forEach(b => {
            b.floors.forEach(f => {
                f.units.forEach(u => {
                    if (u.bhk_type === "" || u.size === 0 || u.facing === "") {
                        count++;
                    }
                })
            })
        })
        if (count > 0) {
            alert(count + " Plot(s) has missing mandatory attributes");
        } else {
            window.localStorage.setItem('pid', this.state.pid);
            window.localStorage.setItem('blocks', JSON.stringify(this.state.blocks));
            window.localStorage.setItem('unitInfo', JSON.stringify(this.state.unitInfo));
            window.localStorage.setItem('attributeInfo', JSON.stringify(this.state.uniqueAtt));
            window.localStorage.setItem('facingInfo', JSON.stringify(this.state.facing));
            window.open(`/preview/p/${this.state.pid}`, "_blank");
        }
    }

    save = () => {
        axios.post(`${domain}/api/builder/save`, {
            pid: this.state.pid,
            pname: this.state.pname,
            type: "plot",
            main: this.state.blocks,
            unitInfo: this.state.unitInfo,
            uniqueAtt: this.state.uniqueAtt,
            facing: this.state.facing
        }).then((response) => {
            alert("Project saving: " + response.data.status);
        }).catch((err) => {
            console.error("Something went wrong", err)
        })
    }

    update = (newBlock) => {
        let newData = this.state.blocks;
        newData.forEach(t => {
            if (t.tid === newBlock.tid) {
                newData[newData.indexOf(t)] = newBlock;
            }
        })
        this.setState({ blocks: newData });
    }

    render() {
        return (
            !this.state.loaded ? (
                <Backdrop open={true}>
                    <CircularProgress color="secondary" />
                </Backdrop>
            ) : this.state.blocks === undefined ? <Redirect to="/builder" /> : (
                <React.Fragment>
                    {this.state.blocks.map(block => (
                        <React.Fragment key={block.tid}>
                            <br />
                            <GenerateMatrix
                                block={block}
                                update={this.update}
                                unitInfo={this.state.unitInfo}
                                uniqueAtt={this.state.uniqueAtt}
                                facing={this.state.facing}
                                disables={this.state.disabled}
                            />
                        </React.Fragment>
                    ))}
                    <br /><br />
                    <center>
                        <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={this.save}>Save Draft</Button>
                        <Button color="primary" variant="contained" style={{ margin: "4px" }} onClick={this.preview} >Preview</Button>
                    </center>
                </React.Fragment>
            )
        )
    }
}

export default GeneratePlot;
