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
            loaded: false
        }
    }

    componentDidMount() {
        const pid = window.location.pathname.split('/')[2];
        const dev = 'https://propking.herokuapp.com/api/builder/getproject/' + pid;
        console.log('component mount')
        if (this.props.location.towers !== undefined) {
            console.log("found")
            this.setState({
                loaded: true,
                pid: pid,
                towers: this.props.location.towers,
                unitInfo: this.props.location.unitInfo,
                uniqueAtt: this.props.location.uniqueAtt,
                facing: this.props.location.facing,
                page: 1
            })
        } else {
            console.log("notfound")
            axios.get(dev).then((response) => {
                this.setState({
                    loaded: true,
                    pid: pid,
                    towers: response.data.towers,
                    unitInfo: response.data.unitInfo,
                    uniqueAtt: response.data.uniqueAtt,
                    facing: response.data.facing,
                    page: 1
                });
            }).catch((err) => {
                console.error("Something went wrong", err);
            })
        }
    }

    handleChange = (event, page) => {
        this.setState({ page });
    }

    preview = () => {
        window.localStorage.setItem('pid', this.state.pid);
        window.localStorage.setItem('towers', JSON.stringify(this.state.towers));
        window.localStorage.setItem('unitInfo', JSON.stringify(this.state.unitInfo));
        window.open(`/preview/${this.state.pid}`, "_blank");
    }

    updateState = (newTower) => {
        let newData = this.state.towers;
        newData.forEach(t => {
            if (t.tid === newTower.tid) {
                newData[newData.indexOf(t)] = newTower;
            }
        })
        this.setState({ towers: newData });
    }

    save = () => {
        axios.post('https://propking.herokuapp.com/api/builder/save', {
            pid: this.state.pid,
            towers: this.state.towers,
            unitInfo: this.state.unitInfo,
            uniqueAtt: this.state.uniqueAtt,
            facing: this.state.facing
        }).then((response) => {
            alert("Data saving: " + response.data.status);
        }).catch((err) => {
            console.error("Something went wrong", err)
        })
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
                            tower={this.state.towers[this.state.page - 1]}
                            facing={this.state.facing}
                            unitInfo={this.state.unitInfo}
                            uniqueAtt={this.state.uniqueAtt}
                            save={this.save}
                            update={this.updateState}
                            preview={this.preview}
                        />
                        <br />
                        <Pagination count={this.state.towers.length} page={this.state.page} onChange={this.handleChange} color="primary" />
                    </div >
                )
        )
    }
}

export default Preview;
