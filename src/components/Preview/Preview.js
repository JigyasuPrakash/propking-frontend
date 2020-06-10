import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PreviewMatrix from './PreviewMatrix';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import Header from '../Header/Header';

class Preview extends Component {

    constructor(props) {
        super(props)

        this.staate = {
            pid: this.props.location.pid,
            tower: this.props.location.tower,
            uniqueArea: this.props.location.uniqueArea,
            uniqueAtt: this.props.location.uniqueAtt,
            flatTypes: this.props.location.flatTypes,
            facing: this.props.location.facing,
            page: 1,
            updatedTowers: []
        }

        this.state = {
            pid: 12346,
            tower: [
                {
                    tid: 'T2',
                    tname: 'PQR',
                    floors: [
                        {
                            fid: 'T2F1',
                            floor_no: 1,
                            units: [
                                {
                                    uid: 'T2F1U1',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F1U2',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F1U3',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F1U4',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                }
                            ]
                        },
                        {
                            fid: 'T2F2',
                            floor_no: 2,
                            units: [
                                {
                                    uid: 'T2F2U1',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F2U2',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F2U3',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F2U4',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                }
                            ]
                        },
                        {
                            fid: 'T2F3',
                            floor_no: 3,
                            units: [
                                {
                                    uid: 'T2F3U1',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F3U2',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F3U3',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                },
                                {
                                    uid: 'T2F3U4',
                                    bhk_type: 0,
                                    size: 0,
                                    att: "",
                                    facing: "",
                                    status: true
                                }
                            ]
                        }
                    ]
                }
            ],
            uniqueArea: [{ key: 1, label: 1025 }, { key: 2, label: 1300 }],
            uniqueAtt: [{ key: 1, label: "Garden Facing" }, { key: 2, label: "Club House Facing" }],
            flatTypes: [2, 2.5, 3],
            facing: ['East', 'West', 'North'],
            page: 1
        }
    }

    save = (newTower) => {
        axios.post('http://localhost:7777/api/builder/save', {
            pid: this.state.pid,
            tid: newTower.tid,
            tower: newTower
        }).then((response) => {
            alert("Data saving: " + response.data.status);
        }).catch((err) => {
            console.error("Something went wrong", err)
        })
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

        const handleChange = (event, page) => {
            this.setState({ page });
        }

        return (
            this.state.tower === undefined ? <Redirect to="/builder" /> : (
                <div>
                    <Header publish={this.publish} />
                    <PreviewMatrix
                        tower={this.state.tower[this.state.page - 1]}
                        facing={this.state.facing}
                        uniqueArea={this.state.uniqueArea}
                        uniqueAtt={this.state.uniqueAtt}
                        flatTypes={this.state.flatTypes}
                        save={this.save}
                    />
                    <br />
                    <Pagination count={this.state.tower.length} page={this.state.page} onChange={handleChange} color="primary" />
                </div >
            )
        )
    }
}

export default Preview
