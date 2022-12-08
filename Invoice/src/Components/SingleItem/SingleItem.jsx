import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import './SingleItem.css'

function SingleItem() {

    const history = useHistory();
    const [bill, setBill] = useState();
    const { invoiceId } = useParams();

    const fetchBill = async () => {
        const response = await axios.get(`https://billing-system-server.onrender.com/invoices/${invoiceId}`)
        console.log(response.data.invoice)
        setBill(response.data.invoice)
    }

     useEffect(() => {
        fetchBill()
    }, [])
    
    

    const handleRedirect = () => {
        history.push('/')
    }

    return (
        <div>
            {bill && (
                <div className="Preview_page">
                <div className="Preview_content">
                    <h1>Invoice</h1>
                    <div className="left_right_div">
                        <div className="Preview_left">
                            <h3 className="tag">Bill To </h3>
                            <p>fullName: <span>{bill.name}</span></p>
                            <p>companyName:  <span>{bill.company}</span></p>
                            <p>Email:  <span>{bill.email}</span></p>
                        </div>
                        <div className="Preview_right">
                            <h3>Invoice Details</h3>
                            <p>Invoice Id :  <span>{bill.invoiceId}</span></p>
                            <p>Invoice Start: <span>{new Date(bill.invoiceStart).toLocaleDateString()}</span></p>
                            <p>Invoice End: <span>{new Date(bill.invoiceEnd).toLocaleDateString()}</span></p>
                        </div>
                        </div>
                        <div className="data Preview_items">
                            <span>Item</span>
                            <span>Qty</span>
                            <span>Rate</span>
                            <span>Amount</span>
                        </div>

                        {bill &&
                            bill.items.map((product, index) => {
                            return (
                            <div className="Preview_items_details" key={index}>
                                <p>{product.item}</p>
                                <p>{product.qty}</p>
                                <p>{product.rate}</p>
                                <p>{product.qty * product.rate} </p>
                            </div>
                            );
                        })}
                        <div className="invoice_status">
                            <h4>
                                Term: <span className="summary_text">{bill.term}</span>
                            </h4>
                        </div>
                        <div className="summary_section">
                            <h3 className="summary_title">Invoice Summary</h3>
                            <h4>
                                Status: <span>{bill.status}</span>
                            </h4>
                            <h4 className="total_amount">
                                Total Amount: <span className="summary_text"> INR {bill.amount}</span>
                            </h4>
                        </div>
                    </div>
                </div>
            )}

            <div className="Preview_download_btn">
                <button className="pay-btn" onClick={handleRedirect}>
                Home
                </button>
            </div>
        </div>
    )
}

export default SingleItem;
