import React, { Component } from 'react';
import axios from 'axios';
import LeftPreview from './LeftPreview';
import MiddlePreview from './MiddlePreview';
import RightPreview from './RightPreview';
import PreviewModal from './PreviewModal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { domain } from '../../../../config';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class PreviewPlot extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pid: window.location.pathname.split('/')[3],
            blocks: undefined,
            areaArray: [],
            selectUnit: { uid: "" },
            unitInfo: [],
            filteredBlocks: undefined,
            open: false,
            url: '',
            loading: true
        }
    }

    componentDidMount() {
        let pid = window.localStorage.getItem('pid');
        let blocks = JSON.parse(window.localStorage.getItem('blocks'));
        let unitInfo = JSON.parse(window.localStorage.getItem('unitInfo'));
        this.setState({ pid, blocks, unitInfo, filteredBlocks: blocks, loading: false });
    }

    publish = () => {
        axios.post(`${domain}/api/builder/p/publish`, {
            pid: this.state.pid
        }).then((response) => {
            this.setState({ url: response.data.url });
            alert("Project Publishing: " + response.data.status);
        }).catch((err) => {
            console.log("Something went wrong", err);
        })
    }

    publishedLink = () => {
        if (this.state.url === '') {
            return null;
        } else {
            return (
                <Button
                    contained
                    variant="outlined"
                    color="primary"
                    onClick={() => window.open(this.state.url)}
                    style={{ margin: "12px" }}>
                    Link
                </Button>
            )
        }
    }

    selectUnit = (selectUnit) => {
        this.setState({ selectUnit });
    }

    handleTowerFilter = (info) => {
        console.log(info)
        let data = this.state.blocks.filter((t) => {
            return info.includes(t.tid);
        });
        if (data.length === 0) {
            data = this.state.blocks;
        }
        this.setState({ filteredBlocks: data });
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

        return (this.state.loading ? (
            <Backdrop open={true}>
                <CircularProgress color="secondary" />
            </Backdrop>) :
            this.state.blocks === undefined ? (
                <center>
                    <h3>Somthing went wrong</h3>
                    <Button variant="contained" onClick={() => window.close()}>Close</Button>
                </center>
            ) : (
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
                        {this.publishedLink()}
                        <Grid container justify="space-evenly">
                            <Grid item sm xs={12} style={{ margin: "16px" }}>
                                <Paper elevation={3} >
                                    <LeftPreview
                                        tower={this.state.blocks}
                                        unitInfo={this.state.unitInfo}
                                        towerFilter={this.handleTowerFilter}
                                        areaFilter={this.handleAreaFilter}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item sm={6} xs={12} style={{ margin: "16px" }}>
                                <MiddlePreview
                                    tower={this.state.filteredBlocks}
                                    areaFilter={this.state.areaArray}
                                    selected={this.state.selectUnit}
                                    unitSelect={this.selectUnit}
                                />
                            </Grid>
                            <Grid item sm xs={12} style={{ margin: "16px" }}>
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
                )
        )
    }
}

export default PreviewPlot;