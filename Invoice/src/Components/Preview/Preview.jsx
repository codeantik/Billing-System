import React, { useState, useRef } from 'react';
import './Preview.css';
import 'react-toastify/dist/ReactToastify.css';
import '@progress/kendo-theme-material/dist/all.css';
import { Button } from '@progress/kendo-react-buttons';
import emailjs from 'emailjs-com';
import QRCode from 'qrcode'
import { useHistory } from 'react-router';
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';

export default function Preview(props) {
  const pdfExportComponents = useRef(null);
  const { term, status } = props.invoicestatus;
  const [pdf, setPdf] = useState()
  const [qr, setQr] = useState()
  const {
    fullName,
    email,
    companyName,
    invoiceId,
    invoiceStart,
    invoiceEnd
  } = props.userInfo;

  const history = useHistory()
  console.log(props.data)

  const [product, setProduct] = useState({
    name: 'Invoice Payment',
    price: props.totalAmount,
    productBy: 'codeantik',
  })

  const handleRedirect = () => {
    history.push('/')
  }

  const postInvoice = () => {
    let invoice = {
      name: fullName,
      email: email,
      company: companyName,
      invoiceId: invoiceId,
      invoiceStart: invoiceStart,
      invoiceEnd: invoiceEnd,
      status: status,
      amount: props.totalAmount,
      term: term,
      items: props.data,
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    return fetch('http://localhost:8282/invoices', {
        method: 'POST',
        headers,
        body: JSON.stringify(invoice)
    }).then(response => {
        console.log('Response:', response)
        const { status } = response
        console.log('Status:', status)
      if (status === 200) {
          toast("Success! Sent to db", { type: "success" });
      } else {
          toast("Something went wrong", { type: "error" });
      }
    })
    .catch(err => {
      console.log('Error:', err)
    })
  }

  const makePayment = (token) => {

    const body = {
      token,
      product,
    }
    const headers = {
      'Content-Type': 'application/json'
    }

    return fetch('http://localhost:8282/payment', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then(response => {
        console.log('Response:', response)
        const { status } = response
        console.log('Status:', status)
      if (status === 200) {
          toast("Success! Payment completed!", { type: "success" });
      } else {
          toast("Something went wrong", { type: "error" });
      }
    })
    .catch(err => {
      console.log('Error:', err)
    })
    
  }

  const handlePdf = () => {
    if(invoiceId == "null" || email == "null" || fullName == "null" ){
      alert("Please fill required data!!!");
    } else {
      drawDOM(pdfExportComponents.current, {
        paperSize: "A4",
      })
        .then((group) => {
          return exportPDF(group);
        })
        .then((dataUri) => {
          console.log(dataUri.split(";base64,")[1])
          let temp = dataUri.split(";base64,")[1]
          setPdf(`data:application/pdf;base64,${temp}`)
          // setPdf(temp)
        });

      QRCode.toDataURL(invoiceId)
        .then(url => {
          console.log(url)
          setQr(url)
        })
        .catch(err => {
          console.error(err)
        })
      // pdfExportComponents.current.save();

    }
  }

  const sendToEmail = () => {
    console.log('sendEmail')
    postInvoice() // send data to database

    let templateParams = {
      toEmail: email,
      invoicePdf: pdf,
      QR: qr,
    }

    // send email through emailjs
    // emailjs.send('service_lsvwxv9', 'template_97xok2b', templateParams, 'user_DjLVtsgqwmWG7WeLqg1iF')
    // .then(function(response) {
    //    console.log('SUCCESS!', response.status, response.text);
    // }, function(error) {
    //    console.log('FAILED...', error);
    // });
    
    // send email through nodemailer
    const headers = {
      'Content-Type': 'application/json'
    }

    return fetch('http://localhost:8282/sendmail', {
        method: 'POST',
        headers,
        body: JSON.stringify(templateParams)
      }).then(response => {
        console.log('Response:', response)
        const { status } = response
        console.log('Status:', status)
        if (status === 200) {
          toast("Success! Check email for details", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
      })
      .catch(err => {
        console.log('Error:', err)
      })


      // redirect to home page
      // history.push('/')

  }

  return (
    <>
      {/* <PDFExport ref={pdfExportComponents} paperSize="auto"> */}
        <ToastContainer />
        <div className="Preview_page" ref={pdfExportComponents}>
          <div className="Preview_content">
            <h1>Invoice</h1>
            <div className="left_right_div">
              <div className="Preview_left">
                <h3 className="tag">Bill To </h3>
                <text>FullName: {fullName}</text>
                <text>companyName: {companyName} </text>
                <text>Email: {email} </text>
              </div>
              <div className="Preview_right">
                <h3>Invoice Details</h3>
                <text>Invoice Id : {invoiceId} </text>
                <text>Invoice Start: {invoiceStart}</text>
                <text>Invoice End: {invoiceEnd}</text>
              </div>
            </div>
            <div className="data Preview_items">
              <span>Item</span>
              <span>Qty</span>
              <span>Rate</span>
              <span>Amount</span>
            </div>

            {props.data &&
              props.data.map((product, index) => {
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
                Terms: <span className="summary_text"> {term} </span>
              </h4>
            </div>
            <div className="summary_section">
              <h3 className="summary_title">Invoice Summary</h3>
              <h4>
                Status:
                {status == 'Paid' && (
                  <span className="status_text" style={{ color: 'green' }}>
                    {status}
                  </span>
                )}
                {status == 'OutStanding' && (
                  <span className="status_text" style={{ color: '#e8b202' }}>
                    {status}
                  </span>
                )}
                {status == 'Late' && (
                  <span className="status_text" style={{ color: 'red' }}>
                    {status}
                  </span>
                )}
              </h4>
              
              <h4 className="total_amount">
                Total Amount: <span className="summary_text"> INR {props.totalAmount}</span>
              </h4>
            </div>
          </div>
        </div>
      {/* </PDFExport> */}

      <div className="Preview_download_btn">
        <Button primary={true} onClick={handlePdf}>
          Convert To Pdf
        </Button>
        <Button secondary={true} onClick={sendToEmail}>
          Send To Email
        </Button>
        <StripeCheckout
          stripeKey="pk_test_51JpSl4SDlaRN0HjnV9IBrtMNAdWetx1wx8F9DubXAgFzX4K8vMtTb9iOBZ6rMY0oyG79ttVDd43AnV4hsNHTIDvJ00fs1OtSAn"
          token={makePayment}
          name="Pay the inovice amount"
          amount={props.totalAmount * 100}
          currency="INR"
          shippingAddress
          billingAddress
        >
          <button className="pay-btn">
            Pay Now <span className="white-text">{props.totalAmount}</span>
          </button>
        </StripeCheckout>
        <button className="home-btn" onClick={handleRedirect}>
          Home
        </button>
      </div>
    </>
  );
}
