import React, { Component } from 'react'
import GenerateMatrix from './GenerateMatrix';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import Header from '../Header/Header';
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class Preview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: undefined
        }
    }

    componentDidMount() {
        const dev = 'http://localhost:7777/api/getproject/12345';
        //const prod = '/api/getproject/12345';
        // API call here
        axios.get(dev).then((response) => {
            const pid = window.location.pathname.split('/')[2];
            if (this.props.location.tower !== undefined) {
                this.setState({
                    loaded: true,
                    pid: pid,
                    tower: this.props.location.tower,
                    uniqueArea: this.props.location.uniqueArea,
                    uniqueAtt: this.props.location.uniqueAtt,
                    flatTypes: this.props.location.flatTypes,
                    facing: this.props.location.facing,
                    page: 1
                })
            } else {
                //send request to database
                const data = {
                    pid: 12346,
                    tower: [
                        {
                            tid: 'T1',
                            tname: 'ABC',
                            floors: [
                                {
                                    fid: 'T1F1',
                                    floor_no: 1,
                                    units: [
                                        {
                                            uid: 'T1F1U1',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F1U2',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F1U3',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F1U4',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        }
                                    ]
                                },
                                {
                                    fid: 'T1F2',
                                    floor_no: 2,
                                    units: [
                                        {
                                            uid: 'T1F2U1',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F2U2',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F2U3',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F2U4',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        }
                                    ]
                                },
                                {
                                    fid: 'T1F3',
                                    floor_no: 3,
                                    units: [
                                        {
                                            uid: 'T1F3U1',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F3U2',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F3U3',
                                            bhk_type: "",
                                            size: 0,
                                            att: "",
                                            facing: "",
                                            status: true
                                        },
                                        {
                                            uid: 'T1F3U4',
                                            bhk_type: "",
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
                    page: 1,
                    updatedTowers: []
                };
                this.setState({
                    loaded: true,
                    pid: pid,
                    tower: data.tower,
                    uniqueArea: data.uniqueArea,
                    uniqueAtt: data.uniqueAtt,
                    flatTypes: data.flatTypes,
                    facing: data.facing,
                    page: 1
                });
            }
        })
    }

    handleChange = (event, page) => {
        this.setState({ page });
    }

    preview = () => {
        window.localStorage.setItem('project', JSON.stringify(this.state.tower));
        window.open(`/preview/${this.state.pid}`, "_blank");
    }

    save = (newTower) => {
        console.log(newTower);
        let newData = this.state.tower;
        newData.forEach(t => {
            if (t.tid === newTower.tid) {
                t = newTower;
            }
        })
        this.setState({ tower: newData })
        console.log(newData)
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

    render() {
        return (
            this.state.loaded === undefined ? (
                <Backdrop open={true}>
                    <CircularProgress color="primary" />
                </Backdrop>
            ) :
                this.state.tower === undefined ? (<Redirect to="/builder" />) : (
                    <div>
                        <Header publish={this.publish} />
                        <GenerateMatrix
                            tower={this.state.tower[this.state.page - 1]}
                            facing={this.state.facing}
                            uniqueArea={this.state.uniqueArea}
                            uniqueAtt={this.state.uniqueAtt}
                            flatTypes={this.state.flatTypes}
                            save={this.save}
                            preview={this.preview}
                        />
                        <br />
                        <Pagination count={this.state.tower.length} page={this.state.page} onChange={this.handleChange} color="primary" />
                    </div >
                )
        )
    }
}

export default Preview;
