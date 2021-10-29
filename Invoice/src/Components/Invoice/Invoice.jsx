import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Invoice.css';
import Items from '../Items/Items';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
import uniqid from 'uniqid';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));



export default function Invoice({
  data,
  setData,
  userTemplate,
  userInfo,
  setUserInfo,
  invoicestatus,
  setInvoiceStatus,
  totalAmount,
  setTotalAmount,
  }) 
{
  const classes = useStyles();
  const [invoiceId, setInvoiceId] = useState(userInfo?.invoiceId);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({...userInfo, [name]: value });
  };

  // const handleInvoice = () => {
  //   setUserInfo({...userInfo, [invoiceId]: invoiceId });
  //   console.log(invoiceId, userInfo);
  // }


  // useEffect(() => {
  //   const id = uniqid();
  //   setInvoiceId(id);
  //   console.log(invoiceId);
  //   handleInvoice();
  // }, [])

  return (
    <>
      <div className="invoice_page">
          <div className="user_info">
            <h1 className="invoice_heading">Invoice Details</h1>
            <form noValidate autoComplete="off">
              <div className={classes.root}>
                <h4>Bill To</h4>
                <TextField
                  name="fullName"
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  name="companyName"
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                  onChange={handleChange}
                />

                <TextField
                  name="email"
                  id="outlined-email"
                  label="Email"
                  required
                  type="email"
                  variant="outlined"
                  onChange={handleChange}
                />

                <TextField
                  disabled
                  name="invoiceId"
                  id="outlined-email"
                  label="Invoice Id"
                  // type="number"
                  variant="outlined"
                  value={invoiceId}
                />

                <TextField
                  name="invoiceStart"
                  id="outlined-email"
                  label="Invoice Start"
                  type="date"
                  variant="outlined"
                  onChange={handleChange}
                  focused
                />

                <TextField
                  name="invoiceEnd"
                  id="outlined-email"
                  label="Invoice End"
                  type="date"
                  variant="outlined"
                  onChange={handleChange}
                  focused
                />
              </div>

              <Items
                data={data}
                setData={setData}
                userTemplate={userTemplate}
                setInvoiceStatus={setInvoiceStatus}
                invoicestatus={invoicestatus}
                totalAmount={totalAmount}
                setTotalAmount={setTotalAmount}
              />
            </form>
          </div>
          <div className="Preview_btn">
            <Link to="/preview" >
              <Button color="primary">Preview</Button>
            </Link>
          </div>   
        </div>
    </>
  );
}
