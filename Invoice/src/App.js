import React, { useState } from 'react';
import './style.css';
import Homepage from './Components/Homepage';
import Invoice from './Components/Invoice';
import Preview from './Components/Preview';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  const userTemplate = { item: '', qty: '', rate: '' };
  

  const userData = {
    fullName: 'null',
    email: 'null',
    companyName: 'null',
    invoiceId: 'null',
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
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
