import React, { useState } from 'react';
import './style.css';
import Homepage from './Components/Homepage/Homepage';
import Invoice from './Components/Invoice/Invoice';
import Preview from './Components/Preview/Preview';
import Login from './Components/Loginpage/Loginpage';
import Register from './Components/Registerpage/Register';
import SingleItem from './Components/SingleItem/SingleItem';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import uniqid from 'uniqid'

export default function App() {
  const userTemplate = { item: '', qty: 0, rate: 0 };
  const userData = {
    fullName: 'null',
    email: 'null',
    companyName: 'null',
    invoiceId: uniqid(),
    invoiceStart: 'null',
    invoiceEnd: 'null'
  };
  const invoiceStatus = { term: 'null', status: 'null' };
  const [invoicestatus, setInvoiceStatus] = useState(invoiceStatus);

  const [userInfo, setUserInfo] = useState(userData);
  const [data, setData] = useState([userTemplate]);
  const [totalAmount, setTotalAmount] = useState(0)
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/invoice">
            <Invoice
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              data={data}
              setData={setData}
              invoicestatus={invoicestatus}
              setInvoiceStatus={setInvoiceStatus}
              userTemplate={userTemplate}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
            />
          </Route>
          <Route exact path="/preview">
            <Preview
              data={data}
              invoicestatus={invoicestatus}
              userInfo={userInfo}
              totalAmount={totalAmount}
            />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/invoices/:invoiceId">
            <SingleItem />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
