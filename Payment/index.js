const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_51JpSl4SDlaRN0Hjn3k4ueOdlv4zeHsHzhneJGU2eD29MNW51HO3u1scodvz7lMjt4mBBSShFwkeilPDTTinFQMxR00JYAc2INc');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Invoice = require('./models/invoice');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8282;

// databse connection
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => { console.log('connected to database') }
);

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// setting up nodemailer
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "testcodeantik@gmail.com",
        pass: "Codeantiktest",
    },
})

let mailOptions = {
    from: 'codeankit.sin099@gmail.com',
    to: '',
    subject: 'Payment details',
    text: 'Hello, attachments contain your payment details',
    attachments: []
}


// routes

// send mail
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// post an invoice
app.post('/invoices', (req, res) => {
    const invoice = new Invoice({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        invoiceId: req.body.invoiceId,
        invoiceStart: req.body.invoiceStart,
        invoiceEnd: req.body.invoiceEnd,
        status: req.body.status,
        amount: req.body.amount,
        term: req.body.term,
        items: req.body.items,
    })
    invoice.save(err => {
        if (err) return res.status(404).json({ message: err.message, type: 'danger' })
        res.status(200).json({ message: 'Invoice created', type: 'success' })
    })
})

// get all invoices
app.get('/invoices', (req, res) => {
    Invoice.find().exec((err, invoices) => {
        if (err) return res.status(404).json({ message: err.message, type: 'danger' })
        res.status(200).json({ invoices })
    });
})

// get details of an invoice
app.get('/invoices/:invoiceId', (req, res) => {
    let id = req.params.invoiceId;
    // Invoice.findById(id, (err, invoice) => {
    //     if (err) return res.status(404).json({ message: err.message, type: 'danger' })
    //     res.status(200).json({ invoice })
    // });
    Invoice.findOne({ invoiceId: id }, (err, invoice) => {
        if (err) return res.status(404).json({ message: err.message, type: 'danger' })
        console.log(invoice)
        res.status(200).json({ invoice })
    });
})

app.post('/sendmail', (req, res) => {
    const { toEmail, invoicePdf, QR } = req.body;
    mailOptions.to = toEmail;
    mailOptions.attachments = [
        { path: invoicePdf },
        { path: QR },
    ]
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            // res.send(err);
        } else {
            console.log('Sent Successfully', info);
            // res.send(info);
        }
    })
})



// stripe payment
app.post('/payment', (req, res) => {
    const { product, token } = req.body;
    console.log('PRODUCT', product);
    console.log('PRICE', product.price);

    const idempotencyKey = uuidv4(); // user is not charged twice if they reload the page
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: `Payment of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
})


// listen
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
