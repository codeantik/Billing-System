import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './FooterData.css';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const Status = [
  {
    value: 'Paid',
    label: 'Paid'
  },
  {
    value: 'OutStanding',
    label: 'OutStanding'
  },
  {
    value: 'Late',
    label: 'Late'
  }
];

export default function FooterData({ invoicestatus, setInvoiceStatus, totalAmount  }) {
  const classes = useStyles();
  
  const handleChange = e => {
    setInvoiceStatus({ ...invoicestatus, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="left_footer">
        <form className={classes.root}>
          <h4>Terms</h4>
          <TextField
            style={{
              width: '100%'
            }}
            id="outlined-textarea"
            label=" Terms "
            name="term"
            placeholder="Terms and Conditions"
            multiline
            onChange={handleChange}
            variant="outlined"
          />

          <h4>Status</h4>
          <TextField
            id="outlined-select-currency"
            select
            name="status"
            label="Status"
            helperText="Please select payment Status"
            variant="outlined"
            required
            onChange={handleChange}
          >
            {Status.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <div className="summary_section">
            <h2 className="total_amount">Total : {totalAmount} INR </h2>
          </div>
        </form>
      </div>
    </>
  );
}
