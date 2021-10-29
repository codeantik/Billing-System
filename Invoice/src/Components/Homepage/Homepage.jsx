import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './Homepage.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import DashboardItem from '../DashboardItem/DashboardItem';
import axios from 'axios'


export default function Homepage() {

  const history = useHistory();
  const [invoices, setInvoices] = useState([])

  const fetchInvoices = async () => {
    const response = await axios.get('http://localhost:8282/invoices')
    console.log(response.data.invoices)
    setInvoices(response.data.invoices)
  }

  console.log(invoices)

  useEffect(() => {
     if(!sessionStorage.getItem('accessToken')){
        history.push('/login');
     }

     fetchInvoices()
  }, [])

  return (
    <div className="homepage">
      <div className="homepage-navbar">
        <Link to="/">
          <h1 className="homepage-logo">Invoicer.io</h1>
        </Link>
        <nav>
          <li>
            <Link to="/invoice">
              Create Invoice
            </Link>
          </li>
          <li>About</li>
          <li>Contacts</li>
        </nav>
      </div>
      <div className="homepage-content">
        <h2 className="heading">Invoice Dashbard</h2>
        <div className="homepage-dashboard">
            {invoices && invoices.map((invoice, index) => (
              <Link to={`/invoices/${invoice.invoiceId}`} key={index}>
                <DashboardItem 
                key={index}
                email={invoice.email}
                status={invoice.status}
                amount={invoice.amount}
                invoiceId={invoice.invoiceId}  
              />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
