import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function RightSection({ myUnit, handleModal }) {

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
                fullWidth
            >
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Booking">Booking</MenuItem>
                <MenuItem value="Payment">Payment</MenuItem>
            </TextField>
            <div style={{ padding: "8px" }}>
                {myUnit.uid !== "" && (
                    <React.Fragment>
                        <br />
                        <Typography variant="h6" align="center">Flat No. {myUnit.unit_no}</Typography>
                        <Typography variant="subtitle1" align="center">{myUnit.bhk_type} BHK ({myUnit.size} Sq.Ft.)</Typography>
                        <Typography variant="caption" align="center">Features: {myUnit.tags_set}</Typography><br />
                        <Button onClick={() => handleModal(myUnit)}>Floor Plan</Button>
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
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                        <MenuItem value="Net Banking">Net Banking</MenuItem>
                    </TextField>
                    {(paymentOpt === "Cheque" || paymentOpt === "Net Banking") && (
                        <TextField id="refnumber" label="Reference Number" fullWidth />
                    )}
                    <TextField id="comment" label="Comments" fullWidth /><br /><br />
                    <Button variant="outlined" color="primary">Submit</Button>
                </React.Fragment>
            </div>
        </div>
    )
}

export default RightSection
