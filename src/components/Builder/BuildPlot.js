import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FacingOptions from './FacingOptions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

class BuildPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pid: '',
            pname: '',
            blockCount: [],
            blocks: [],
            unitInfo: [],
            uniqueAtt: [],
            facing: [],
            facingOptions: ['East', 'West', 'North', 'South', 'North-East', 'South-East', 'North-West', 'South-West'],
            proceed: false
        };
    }

    render() {

        const createBlock = () => {
            let pname = document.getElementById('pname').value;
            let pid = uuidv4().toString();
            let bcount = document.getElementById('tCount').value;
            let blockCount = []
            for (let i = 1; i <= bcount; i++) {
                blockCount.push({ tid: i });
            }
            this.setState({ blockCount, pname, pid });
        }

        const handleProceed = () => {
            let blocks = [];
            let plotCount = 1;
            this.state.blockCount.forEach(t => {
                let bname = document.getElementById(`bname${t.tid}`).value;
                let floors = []
                let floorCount = document.getElementById(`floorCount${t.tid}`).value;
                for (let i = 1; i <= floorCount; i++) {
                    let units = []
                    let unitCount = document.getElementById(`unitCount${t.tid}`).value;
                    for (let j = 1; j <= unitCount; j++) {
                        units.push({ uid: `T${t.tid}F${i}U${j}`, unit_no: `${plotCount++}`, bhk_type: "", size: 0, att: "", facing: "", status: true });
                    }
                    floors.push({ fid: `T${t.tid}F${i}`, floor_no: i, units });
                }
                blocks.push({
                    tid: t.tid,
                    bname,
                    floors,
                })
            })
            this.setState({ blocks, proceed: true });
        }

        const addFlatType = () => {
            let area = Number(document.getElementById('uniqueArea').value);
            if (area !== 0) {
                this.setState({ unitInfo: [...this.state.unitInfo, { key: area, area, unit: 'Sq. Yds.' }] });
            } else {
                alert("Please provide some value");
            }
            document.getElementById('uniqueArea').value = 0;
            this.setState({ bhk: "" });
        }

        const handleAreaDelete = (areaToDelete) => () => {
            this.setState((prevState) => ({ unitInfo: prevState.unitInfo.filter((data) => data.key !== areaToDelete.key) }));
        };

        const createArea = (
            this.state.unitInfo.map((data) => {
                return (
                    <div key={data.key}>
                        <Chip
                            size="small"
                            label={`${data.area} sq.yds.`}
                            onDelete={handleAreaDelete(data)}
                        /><br />
                    </div>
                );
            })
        );

        const addAtt = () => {
            let att = document.getElementById('uniqueAtt').value;
            if (att !== '') {
                this.setState({ uniqueAtt: [...this.state.uniqueAtt, { key: att, label: att }] });
            } else {
                alert("Please provide some value");
            }
            document.getElementById('uniqueAtt').value = null;
        }

        const handleAttDelete = (attToDelete) => () => {
            this.setState((prevState) => ({ uniqueAtt: prevState.uniqueAtt.filter((data) => data.key !== attToDelete.key) }));
        }

        const createAtt = (
            this.state.uniqueAtt.map((att) => {
                return (
                    <React.Fragment>
                        <Chip
                            key={att.key}
                            size="small"
                            label={att.label}
                            onDelete={handleAttDelete(att)}
                        /><br />
                    </React.Fragment>
                )
            })
        );

        const handleFaceFilter = (info) => {
            let data = this.state.facing;
            if (data.includes(info)) {
                data = data.filter(a => { return a !== info });
            } else {
                data.push(info);
            }
            this.setState({ facing: data });
        }

        const validate = () => {
            if (this.state.pname !== ''
                && this.state.blocks.length !== 0
                && this.state.unitInfo.length !== 0
                && this.state.facing.length !== 0) {
                return true;
            } else {
                return false;
            }
        }

        return (
            <div style={{ padding: "25px" }}>
                <Paper style={{ padding: "15px" }}>
                    <Typography variant="h6">Project Details</Typography>
                    <br />
                    <Grid container justify="flex-start">
                        <Grid item xs={2}>
                            <TextField required size="small" id="pname" label="Project Name" />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField required size="small" id="tCount" label="Number of blocks" type="number" />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="outlined" onClick={createBlock} style={{ marginTop: "10px" }}>
                                Create
                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <br />
                {this.state.blockCount.length === 0 ? null : (
                    <Paper style={{ padding: "15px" }}>
                        <Typography variant="h6">Tower Details</Typography>
                        <br />
                        {this.state.blockCount.map(t => (
                            <Grid container key={t.tid} justify="flex-start">
                                <Grid item xs={2}>
                                    <TextField size="small" id={`bname${t.tid}`} label={`Block-${t.tid} Name`} />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField required size="small" id={`floorCount${t.tid}`} label="No. of Rows" type="number" />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField required size="small" id={`unitCount${t.tid}`} label="Units per row" type="number" />
                                </Grid>
                            </Grid>
                        ))}
                        <br />
                        <center>
                            <Button
                                style={{ margin: "10px" }}
                                onClick={handleProceed}
                                variant="outlined">Proceed</Button>
                        </center>

                    </Paper>
                )}
                <br />
                {this.state.proceed ? (
                    <Paper style={{ padding: "15px" }}>
                        <Typography variant="h6">Flat Features</Typography>
                        <br />
                        <Grid container justify="space-evenly">
                            <Grid item xs={4}>
                                <center>
                                    <label>Unique Areas *: </label>
                                </center><br />
                                <Grid container justify="center">
                                    <Grid item xs={10}>
                                        <TextField required size="small" fullWidth id="uniqueArea" label="Area" type="number" />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Fab
                                            size="small"
                                            color="primary"
                                            aria-label="add"
                                            onClick={addFlatType}
                                            style={{ margin: "5px" }}>
                                            <AddIcon />
                                        </Fab>
                                    </Grid>
                                    <br /><br /><br />
                                    {createArea}
                                </Grid>
                            </Grid>

                            <Grid item xs={4}>
                                <center>
                                    <label>Unique Attributes: </label>
                                </center><br />
                                <Grid container justify="space-evenly">
                                    <Grid item xs={10}>
                                        <TextField size="small" id="uniqueAtt" label="Unique Attributes" />
                                        <Fab
                                            size="small"
                                            color="primary"
                                            aria-label="add"
                                            onClick={addAtt}
                                            style={{ margin: "5px" }}>
                                            <AddIcon />
                                        </Fab>
                                    </Grid>
                                    <br /><br /><br />
                                    {createAtt}
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <center>
                                    <label>Unique Facings*</label>
                                </center><br />
                                {this.state.facingOptions.map(face => (
                                    <FacingOptions key={face} data={face} filter={handleFaceFilter} />
                                ))}
                            </Grid>
                        </Grid>
                        <br /><br />
                        <center>
                            {validate() && (<Link
                                to={{
                                    pathname: `/generate/p/${this.state.pid}`,
                                    pname: this.state.pname,
                                    blocks: this.state.blocks,
                                    unitInfo: this.state.unitInfo,
                                    uniqueAtt: this.state.uniqueAtt,
                                    facing: this.state.facing
                                }}
                                style={{ textDecoration: "none" }}><Button
                                    variant="contained"
                                    color="primary"
                                    onClick={validate}>Generate Preview</Button></Link>)
                            }
                        </center>
                    </Paper>
                ) : null
                }
            </div >
        );
    }
}

export default BuildPlot;
