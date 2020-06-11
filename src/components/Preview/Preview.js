import React, { Component } from 'react';
import axios from 'axios';
import LeftPreview from './LeftPreview';
import MiddlePreview from './MiddlePreview';
import RightPreview from './RightPreview';
import PreviewModal from './PreviewModal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pid: window.location.pathname.split('/')[2],
            towers: undefined,
            areaArray: [],
            selectUnit: undefined,
            unitInfo: [],
            filteredTower: undefined,
            open: false
        }
    }

    componentDidMount() {
        let pid = window.localStorage.getItem('pid');
        let towers = JSON.parse(window.localStorage.getItem('towers'));
        let unitInfo = JSON.parse(window.localStorage.getItem('unitInfo'));
        this.setState({ pid, towers, unitInfo, filteredTower: towers });
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

    selectUnit = (selectUnit) => {
        this.setState({ selectUnit });
    }

    handleTowerFilter = (info) => {
        console.log(info)
        let data = this.state.towers.filter((t) => {
            return info.includes(t.tid);
        });
        if (data.length === 0) {
            data = this.state.towers;
        }
        this.setState({ filteredTower: data });
    }

    handleAreaFilter = (info) => {
        let data = this.state.areaArray;
        if (data.includes(info)) {
            data = data.filter(a => { return a !== info });
        } else {
            data.push(info);
        }
        this.setState({ areaArray: data });
    }

    handleModalOpen = () => {
        this.setState({ open: true });
    }
    handleModalClose = () => {
        this.setState({ open: false });
    }

    render() {

        return (
            this.state.towers === undefined ? (
                <center>
                    <h3>Somthing went wrong</h3>
                    <Button variant="contained" onClick={() => window.close()}>Close</Button>
                </center>
            ) : (
                    <React.Fragment>
                        <Header />
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
                            <Grid container justify="space-evenly">
                                <Grid item sm xs={12} style={{ margin: "18px" }}>
                                    <Paper elevation={3} >
                                        <LeftPreview
                                            tower={this.state.towers}
                                            unitInfo={this.state.unitInfo}
                                            towerFilter={this.handleTowerFilter}
                                            areaFilter={this.handleAreaFilter}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item sm={6} xs={12} style={{ margin: "18px" }}>
                                    <Paper elevation={3}>
                                        <MiddlePreview
                                            tower={this.state.filteredTower}
                                            areaFilter={this.state.areaArray}
                                            unitSelect={this.selectUnit}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item sm xs={12} style={{ margin: "18px" }}>
                                    <Paper elevation={3} >
                                        <RightPreview
                                            myUnit={this.state.selectUnit}
                                            handleModal={this.handleModalOpen}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>

                            {this.state.selectUnit === undefined ? null : (
                                <PreviewModal
                                    unit={this.state.selectUnit}
                                    open={this.state.open}
                                    handleModalClose={this.handleModalClose} />)
                            }
                        </center>
                    </React.Fragment>
                )
        )
    }
}

export default Home
