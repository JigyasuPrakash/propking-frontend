import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PreviewMatrix from './PreviewMatrix';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import PreviewOptions from './PreviewOptions';

class Preview extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tower: this.props.location.tower,
            uniqueArea: this.props.location.uniqueArea,
            uniqueAtt: this.props.location.uniqueAtt,
            flatTypes: this.props.location.flatTypes,
            facing: this.props.location.facing,
            page: 1
        }

        // this.state = {
        //     tower: [
        //         {
        //             tid: 'T1',
        //             tname: 'ABC',
        //             floors: [
        //                 {
        //                     fid: 'T1F1',
        //                     floor_no: 1,
        //                     units: [
        //                         {
        //                             uid: 'T1F1U1',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F1U2',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F1U3',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F1U4',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F1U5',
        //                             bhk_type: 0,
        //                             size: 0
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     fid: 'T1F2',
        //                     floor_no: 2,
        //                     units: [
        //                         {
        //                             uid: 'T1F2U1',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F2U2',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F2U3',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F2U4',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F2U5',
        //                             bhk_type: 0,
        //                             size: 0
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     fid: 'T1F3',
        //                     floor_no: 3,
        //                     units: [
        //                         {
        //                             uid: 'T1F3U1',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F3U2',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F3U3',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F3U4',
        //                             bhk_type: 0,
        //                             size: 0
        //                         },
        //                         {
        //                             uid: 'T1F3U5',
        //                             bhk_type: 0,
        //                             size: 0
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ],
        //     uniqueArea: [{ key: 1, label: 1025 }, { key: 2, label: 1300 }],
        //     uniqueAtt: [{ key: 1, label: "Garden Facing" }, { key: 2, label: "Club House Facing" }],
        //     flatTypes: [2, 2.5, 3],
        //     facing: ['East', 'West', 'North'],
        //     page: 1
        // }
    }

    render() {

        const handleChange = (event, page) => {
            this.setState({ page });
        }

        return (
            this.state.tower === undefined ? <Redirect to="/builder" /> : (
                <div>
                    <PreviewOptions area={this.state.uniqueArea} attributes={this.state.uniqueAtt} />
                    <Grid>
                        <PreviewMatrix tower={this.state.tower[this.state.page - 1]} />
                    </Grid>
                    <br />
                    <Pagination count={this.state.tower.length} page={this.state.page} onChange={handleChange} color="primary" />
                </div >
            )
        )
    }
}

export default Preview
