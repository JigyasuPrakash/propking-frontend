import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function RightSection({ myUnit, handleModal, response, customer }) {

    const [action, setAction] = React.useState("Lead");
    const handleChange = (event) => {
        setAction(event.target.value);
    }

    const [paymentOpt, setPayment] = React.useState("");
    const handlePaymentChange = (event) => {
        setPayment(event.target.value);
    }

    return (
        <div style={{ padding: "15px" }}>
            <TextField
                select
                label="Proceed with.."
                value={action}
                onChange={handleChange}
                fullWidth>
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Booking">Booking</MenuItem>
                <MenuItem value="Payment">Payment</MenuItem>
            </TextField>
            <center>
                {myUnit.uid !== "" && (
                    <React.Fragment>
                        <br />
                        <Typography variant="h6" align="center">Flat No. {myUnit.unit_no}</Typography>
                        <Typography variant="subtitle1" align="center">Area: {myUnit.size} Sq.Yds.</Typography>
                        <Typography variant="caption" align="center">Feature: {myUnit.tags_set}</Typography>
                    </React.Fragment>
                )}
                <React.Fragment>
                    <TextField id="customername" label="Name" required fullWidth />
                    <TextField id="agentname" label="Agent Name" fullWidth />
                    <TextField id="phone" label="Phone No" type="number" required fullWidth />
                    <TextField id="amount" label="Amount" type="number" required fullWidth />
                    <TextField
                        select
                        label="Payment Type"
                        value={paymentOpt}
                        onChange={handlePaymentChange}
                        required
                        fullWidth>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Net Banking">Net Banking</MenuItem>
                    </TextField>
                    {(paymentOpt === "Cheque" || paymentOpt === "Net Banking") && (
                        <TextField id="refnumber" label="Reference Number" fullWidth />
                    )}
                    <TextField id="comment" label="Comments" fullWidth /><br /><br />
                    <Button variant="outlined" color="primary">Submit</Button>
                </React.Fragment>
            </center>
        </div>
    )
}

export default RightSection
