import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function RightSection({ myUnit, handleModal, response }) {

    const [action, setAction] = React.useState("");
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
                response(action, { unit: myUnit.uid, name, agentname, phone, comment });
            } else {
                alert("Please fill mandatory fields to continue");
            }
        } else if (action === "Booking" || action === "Payment") {
            let amount = document.getElementById("amount").value;
            if (name !== "" && phone !== "") {
                response(action, { unit: myUnit.uid, name, agentname, phone, paymentOpt, amount, comment });
            } else {
                alert("Please fill mandatory fields to continue");
            }
        }
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
                {/* Do it for booked flats as well */}
                <MenuItem value="Lead">Lead</MenuItem>
                {(myUnit.uid !== "") && (myUnit.status === "true") && (<MenuItem value="Booking">Booking</MenuItem>)}
                {(myUnit.uid !== "") && (myUnit.status === "false") && (<MenuItem value="Payment">Payment</MenuItem>)}
            </TextField>
            <div style={{ padding: "8px" }}>
                <center>
                    {myUnit.uid === "" ?
                        null
                        : (
                            <React.Fragment>
                                <br />
                                <Typography variant="h6" align="center">Flat No. {myUnit.unit_no}</Typography>
                                {((action === "Booking") || (action === "Payment")) && (
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
                                            <TextField id="refnumber" label="Refernce Number" fullWidth />
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
            </div>
        </div>
    )
}

export default RightSection
