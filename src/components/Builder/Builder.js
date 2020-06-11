import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FacingOptions from './FacingOptions';

class Builder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pid: 12346,
            towerCount: [],
            towers: [],
            unitInfo: [],
            uniqueAtt: [],
            flatTypes: [],
            flatTypesOptions: [2, 2.5, 3, 3.5, 4],
            facing: [],
            facingOptions: ['East', 'West', 'North', 'South', 'North-East', 'South-East', 'North-West', 'South-West'],
            proceed: false
        };
    }

    render() {

        const createTower = () => {
            let tcount = document.getElementById('tCount').value;
            let towerCount = []
            for (let i = 1; i <= tcount; i++) {
                towerCount.push({ tid: i });
            }
            this.setState({ towerCount });
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
                        units.push({ uid: `T${t.tid}F${i}U${j}`, unit_no: `${i}${num}`, bhk_type: "", size: 0, att: "", facing: "", status: true });
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
            let bhk = Number(document.getElementById('uniquebhk').value);
            let area = Number(document.getElementById('uniqueArea').value);
            if (area !== 0 && bhk !== 0) {
                this.setState({ unitInfo: [...this.state.unitInfo, { key: bhk + area, bhk, area }] });
            } else {
                alert("Please provide some value");
            }
            document.getElementById('uniqueArea').value = null;
            document.getElementById('uniquebhk').value = null;
        }

        const handleAreaDelete = (areaToDelete) => () => {
            this.setState((prevState) => ({ unitInfo: prevState.unitInfo.filter((data) => data.key !== areaToDelete.key) }));
        };

        const createArea = (
            this.state.unitInfo.map((data) => {
                return (
                    <Chip
                        key={data.key}
                        size="small"
                        label={`${data.bhk} BHK (${data.area} sq.ft.)`}
                        onDelete={handleAreaDelete(data)}
                    />
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
                    <Chip
                        key={att.key}
                        size="small"
                        label={att.label}
                        onDelete={handleAttDelete(att)}
                    />
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

        return (
            <div>
                <label>Number of Tower: </label>
                <input id="tCount" type="number" />
                <button onClick={createTower}>
                    Create
                </button>

                {this.state.towerCount.map(t => (
                    <div key={t.tid}>
                        <label>Tower Name: </label>
                        <input id={`tname${t.tid}`} type="text" />
                        <label>No. floors: </label>
                        <input id={`floorCount${t.tid}`} type="number" />
                        <label>Max no. of flats per floor: </label>
                        <input id={`unitCount${t.tid}`} type="number" />
                        <br />
                    </div>
                ))}
                {this.state.towerCount.length === 0 ? null : (
                    <button onClick={handleProceed}>Proceed</button>
                )}
                {this.state.proceed ? (
                    <div>
                        <Grid container justify="space-evenly">
                            <Grid item xs={3}>
                                <center>
                                    <label>Unique Flat Types</label>
                                </center><br />
                                <input id="uniquebhk" type="number" placeholder="BHK" />
                                <input id="uniqueArea" type="number" placeholder="Area" />
                                <button onClick={() => addFlatType()}> + </button>
                                <br /><br />
                                {createArea}
                            </Grid>
                            <Grid item xs={3}>
                                <center>
                                    <label>Unique Attributes: </label>
                                </center><br />
                                <input id="uniqueAtt" type="text" placeholder="Unique Attributes" />
                                <button onClick={() => addAtt()}> + </button>
                                <br /><br />
                                {createAtt}
                            </Grid>
                            <Grid item xs={3}>
                                <center>
                                    <label>Unique Facings</label>
                                </center><br />
                                {this.state.facingOptions.map(face => (
                                    <FacingOptions key={face} data={face} filter={handleFaceFilter} />
                                ))}
                            </Grid>
                        </Grid>
                        <br /><br />
                        <center>
                            <Link to={{
                                pathname: `/generate/${this.state.pid}`,
                                towers: this.state.towers,
                                unitInfo: this.state.unitInfo,
                                uniqueAtt: this.state.uniqueAtt,
                                facing: this.state.facing,
                                flatTypes: this.state.flatTypes
                            }}>
                                <Button variant="contained" color="primary">Generate Preview</Button>
                            </Link>
                        </center>
                    </div>
                ) : null}
            </div >
        );
    }
}

export default Builder;
