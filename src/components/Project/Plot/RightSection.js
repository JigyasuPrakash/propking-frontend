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

    const submit = () => {
        let name = document.getElementById("customername").value;
        let agentname = document.getElementById("agentname").value;
        let phone = document.getElementById("phone").value;
        let comment = document.getElementById("comment").value;
        if (action === "Lead") {
            if (name !== "" && phone !== "") {
                response(action, { unit: myUnit.uid, unit_no: myUnit.unit_no, name, agentname, phone, comment });
            } else {
                alert("Please fill mandatory fields to continue");
            }
        } else if (action === "Booking" || action === "Payment") {
            let amount = document.getElementById("amount").value;
            let ref_no = "-";
            if (paymentOpt === "Cheque" || paymentOpt === "Net Banking") {
                ref_no = document.getElementById("refnumber").value;
            }
            if (name !== "" && phone !== "") {
                response(action, { unit: myUnit.uid, unit_no: myUnit.unit_no, name, agentname, phone, paymentOpt, amount, ref_no, comment });
            } else {
                alert("Please fill mandatory fields to continue");
            }
            document.getElementById("amount").value = null;
            if (paymentOpt === "Cheque" || paymentOpt === "Net Banking") {
                document.getElementById("refnumber").value = "";
            }
        }
        document.getElementById("customername").value = "";
        document.getElementById("agentname").value = "";
        document.getElementById("phone").value = null;
        document.getElementById("comment").value = "";
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
                {myUnit.status !== "booked" && (<MenuItem value="Lead">Lead</MenuItem>)}
                {(myUnit.uid !== "") && (myUnit.status === "true" || myUnit.status === "lead") && (<MenuItem value="Booking">Booking</MenuItem>)}
                {(myUnit.uid !== "") && (myUnit.status === "booked") && (<MenuItem value="Payment">Payment</MenuItem>)}
            </TextField>
            {myUnit.status === "true" || myUnit.status === "lead" || myUnit.uid === "" ? (
                <div style={{ padding: "8px" }}>
                    <center>
                        {myUnit.uid === "" ?
                            null
                            : (
                                <React.Fragment>
                                    <br />
                                    <Typography variant="h6" align="center">Flat No. {myUnit.unit_no}</Typography>
                                    <Typography variant="subtitle1" align="center">Area: {myUnit.size} Sq.Yds.</Typography>
                                    <Typography variant="caption" align="center">Feature: {myUnit.tags_set}</Typography>
                                    {action === "Booking" && (
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
                                            <Button variant="outlined" color="primary" onClick={submit}>Submit</Button>
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )
                        }
                        {action === "Lead" && (
                            <React.Fragment>
                                <TextField id="customername" label="Name" required fullWidth />
                                <TextField id="agentname" label="Agent Name" fullWidth />
                                <TextField id="phone" label="Phone No" type="number" required fullWidth />
                                <TextField id="comment" label="Comments" fullWidth /><br /><br />
                                <Button variant="outlined" color="primary" onClick={submit}>Submit</Button>
                            </React.Fragment>)}
                    </center>
                </div>) : (
                    <div style={{ padding: "8px" }}>
                        <center>
                            <React.Fragment>
                                <br />
                                <Typography variant="h6" align="center">Flat No. {myUnit.unit_no}</Typography>
                                {action === "Payment" && (
                                    <React.Fragment>
                                        <TextField id="customername" label="Name" required fullWidth defaultValue={customer.customer_name} />
                                        <TextField id="agentname" label="Agent Name" fullWidth defaultValue={customer.agent_name} />
                                        <TextField id="phone" label="Phone No" type="number" required fullWidth defaultValue={customer.phone} />
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
                                        <Button variant="outlined" color="primary" onClick={submit}>Submit</Button>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        </center>
                    </div>
                )}
        </div>
    )
}

export default RightSection
