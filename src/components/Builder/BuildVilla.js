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
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

class BuildFlat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pid: '',
            pname: '',
            towerCount: [],
            towers: [],
            unitInfo: [],
            uniqueAtt: [],
            flatTypesOptions: [2, 2.5, 3, 3.5, 4],
            facing: [],
            facingOptions: ['East', 'West', 'North', 'South', 'North-East', 'South-East', 'North-West', 'South-West'],
            proceed: false,
            bhk: "",
            type: "",
            floorPlans: [],
            verified: false
        };
    }

    render() {

        const createTower = () => {
            let pname = document.getElementById('pname').value;
            let pid = uuidv4().toString();
            let tcount = document.getElementById('tCount').value;
            let towerCount = []
            for (let i = 1; i <= tcount; i++) {
                towerCount.push({ tid: i });
            }
            this.setState({ towerCount, pname, pid });
        }

        const handleProceed = () => {
            let towers = [];
            this.state.towerCount.forEach(t => {
                let tname = document.getElementById(`tname${t.tid}`).value;
                let floors = []
                let floorCount = document.getElementById(`floorCount${t.tid}`).value;
                for (let i = 1; i <= floorCount; i++) {
                    let units = []
                    let unitCount = document.getElementById(`unitCount${t.tid}`).value;
                    for (let j = 1; j <= unitCount; j++) {
                        let num = '';
                        j <= 9 ? (num = `0${j}`) : num = `${j}`;
                        units.push({ uid: `T${t.tid}F${i}U${j}`, unit_no: `${i}${num}`, bhk_type: "", landArea: 0, type: "", size: 0, att: "", facing: "", status: true, g_img_set: "" });
                    }
                    floors.push({ fid: `T${t.tid}F${i}`, floor_no: i, units });
                }
                towers.push({
                    tid: t.tid,
                    tname,
                    floors,
                })
            })
            this.setState({ towers, proceed: true });
        }

        const addFlatType = () => {
            let landArea = Number(document.getElementById("landArea").value);
            let type = this.state.type;
            let bhk = this.state.bhk;
            let area = Number(document.getElementById('uniqueArea').value);
            if (landArea !== 0 && area !== 0 && bhk !== "" && type !== "") {
                this.setState({ unitInfo: [...this.state.unitInfo, { key: type + bhk + '' + area, landArea, type, bhk, area, unit: 'Sq.Ft.' }] });
            } else {
                alert("Please provide some value");
            }
            document.getElementById("landArea").value = ""
            document.getElementById('uniqueArea').value = "";
            this.setState({ bhk: "", type: "" });
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
                            label={`${data.landArea} Sq.Yds. Land - ${data.type}\n${data.bhk} BHK (${data.area} Sq.Ft.)`}
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
                && this.state.towers.length !== 0
                && this.state.unitInfo.length !== 0
                && this.state.facing.length !== 0) {
                return true;
            } else {
                return false;
            }
        }

        const handleChangeBhk = (event) => {
            this.setState({ bhk: event.target.value });
        }

        const handleChangeType = (event) => {
            this.setState({ type: event.target.value });
        }

        const getfplan = () => {
            let myFPlan = [];
            this.state.unitInfo.forEach(u => {
                this.state.facing.forEach(f => {
                    let url = document.getElementById(`fplan${u.key + f}`).value;
                    if (url !== "") {
                        myFPlan.push({
                            label: `Floor plan: ${u.bhk} BHK (${u.area} Sq.Ft.) - ${f} Facing`,
                            url
                        });
                    }
                })
            });
            let myVerify = myFPlan.length > 0;
            if (!myVerify) {
                alert("At least one floor plan required");
            }
            this.setState({ floorPlans: myFPlan, verified: (validate() && myVerify) });
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
                            <TextField required size="small" id="tCount" label="Number of Blocks" type="number" />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="outlined" onClick={createTower} style={{ marginTop: "10px" }}>
                                Create
                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <br />
                {this.state.towerCount.length === 0 ? null : (
                    <Paper style={{ padding: "15px" }}>
                        <Typography variant="h6">Block Details</Typography>
                        <br />
                        {this.state.towerCount.map(t => (
                            <Grid container key={t.tid} justify="flex-start">
                                <Grid item xs={2}>
                                    <TextField size="small" id={`tname${t.tid}`} label={`Block-${t.tid} Name`} />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField required size="small" id={`floorCount${t.tid}`} label="No. of rows" type="number" />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField required size="small" id={`unitCount${t.tid}`} label="Max no. of villas/row" type="number" />
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
                {this.state.proceed && this.state.towerCount.length !== 0 ? (
                    <Paper style={{ padding: "15px" }}>
                        <Typography variant="h6">Villa Features</Typography>
                        <br />
                        <Grid container justify="space-evenly">
                            <Grid item xs={5}>
                                <center>
                                    <label>Unique Villa Type *: </label>
                                </center><br />
                                <Grid container justify="space-evenly">
                                    <Grid item xs={3}>
                                        <TextField required size="small" id="landArea" label="Land Area" type="number" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            id="villatype"
                                            select
                                            required
                                            size="small"
                                            fullWidth
                                            label="Type"
                                            value={this.state.type}
                                            onChange={handleChangeType}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            <MenuItem value="Simplex">Simplex</MenuItem>
                                            <MenuItem value="Duplex">Duplex</MenuItem>
                                            <MenuItem value="Triplex">Triplex</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            id="uniquebhk"
                                            select
                                            required
                                            size="small"
                                            fullWidth
                                            label="BHK"
                                            value={this.state.bhk}
                                            onChange={handleChangeBhk}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            <MenuItem value={1}>{1}</MenuItem>
                                            <MenuItem value={1.5}>{1.5}</MenuItem>
                                            <MenuItem value={2}>{2}</MenuItem>
                                            <MenuItem value={2.5}>{2.5}</MenuItem>
                                            <MenuItem value={3}>{3}</MenuItem>
                                            <MenuItem value={3.5}>{3.5}</MenuItem>
                                            <MenuItem value={4}>{4}</MenuItem>
                                            <MenuItem value={4.5}>{4.5}</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField required size="small" id="uniqueArea" label="Area" type="number" />
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
                                    <br /><br />
                                </Grid>
                                {createArea}
                            </Grid>

                            <Grid item xs={3}>
                                <center>
                                    <label>Unique Attributes: </label>
                                </center><br />
                                <Grid container justify="space-evenly">
                                    <Grid item xs={10}>
                                        <TextField required size="small" id="uniqueAtt" label="Unique Attributes" />
                                        <Fab
                                            size="small"
                                            color="primary"
                                            aria-label="add"
                                            onClick={addAtt}
                                            style={{ margin: "5px" }}>
                                            <AddIcon />
                                        </Fab>
                                    </Grid>
                                    <br /><br />
                                </Grid>
                                {createAtt}
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
                        <br />
                        {(this.state.unitInfo.length !== 0 && this.state.facing.length !== 0) && (
                            <React.Fragment>
                                <Typography variant="h6">Floor Plan's URLs</Typography>
                                <Grid container justify="flex-start">
                                    {this.state.unitInfo.map(u => (
                                        this.state.facing.map(f => (
                                            <Grid xs={7} item key={u.key + f} style={{ margin: "5px" }}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    id={`fplan${u.key + f}`}
                                                    label={`Floor plan: ${u.bhk} BHK (${u.area} Sq.Ft.) - ${f} Facing`} />
                                            </Grid>
                                        ))
                                    ))}
                                </Grid>
                                <br />
                                <center>
                                    <Button
                                        style={{ margin: "10px" }}
                                        onClick={getfplan}
                                        variant="outlined">Verify</Button>
                                </center>
                            </React.Fragment>
                        )}
                        <br />
                        <center>
                            {this.state.verified && (<Link
                                to={{
                                    pathname: `/generate/v/${this.state.pid}`,
                                    pname: this.state.pname,
                                    towers: this.state.towers,
                                    unitInfo: this.state.unitInfo,
                                    uniqueAtt: this.state.uniqueAtt,
                                    facing: this.state.facing,
                                    floorPlans: this.state.floorPlans
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

export default BuildFlat;
