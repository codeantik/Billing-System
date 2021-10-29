import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './Items.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  Container,
  Paper,
  Box,
  Grid,
  IconButton,
  Button
} from '@material-ui/core';
import FooterData from '../FooterData/FooterData';
import Preview from '../Preview/Preview';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    paddingTop: theme.spacing(5)
  },
}));

export default function Items({
  data,
  setData,
  userTemplate,
  setInvoiceStatus,
  invoicestatus,
  totalAmount,
  setTotalAmount,
}) {
  const classes = useStyles();


  const updateAmount = () => {
    let amount = 0
    data.map(item => { amount += parseInt(item.qty * item.rate) })
    setTotalAmount(amount)
    console.log(amount)
  }

  const addItems = () => {
    setData([...data, userTemplate]);
    updateAmount()
  };
  

  const removeItem = index => {
    data.splice(index, 1);
    console.log(data)
    updateAmount(data)
  };

  const onChange = (e, index) => {
    const updatedData = data?.map((items, i) =>
      index == i
        ? Object.assign(items, { [e.target.name]: e.target.value })
        : items
    );
    setData(updatedData);
    updateAmount()
  };

  return (
    <>
      <Container className={classes.root}>
        <div className="data">
          <span>Item</span>
          <span>Qty</span>
          <span>Rate</span>
          <span>Amount</span>
        </div>

        { data.map((item, index) => (

          <Grid container spacing={3} key={index}>
            <Grid item md={2}>
              <TextField
                name="item"
                label="Item"
                value={item.item}
                variant="outlined"
                size="small"
                onChange={e => onChange(e, index)}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                name="qty"
                label="Qty"
                type="number"
                value={item.qty}
                variant="outlined"
                size="small"
                onChange={e => onChange(e, index)}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                name="rate"
                label="Rate"
                type="number"
                value={item.rate}
                variant="outlined"
                size="small"
                onChange={e => onChange(e, index)}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                disabled
                value={item.qty * item.rate}
                label="amount"
                size="small"
                variant="outlined"
              />
            </Grid>

            <Grid item md={2}>
              <IconButton color="secondary">
                <DeleteOutlineIcon onClick={() => removeItem(index)} />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button variant="contained" color="secondary" onClick={addItems} style={{ marginTop: '20px'}} >
          Add Item
        </Button>
      </Container>

      <div className="footer">
        <FooterData
          data={data}
          setInvoiceStatus={setInvoiceStatus}
          invoicestatus={invoicestatus}
          setTotalAmount={setTotalAmount}
          totalAmount={totalAmount}
        />
      </div>
    </>
  );
}
