const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_51JpSl4SDlaRN0Hjn3k4ueOdlv4zeHsHzhneJGU2eD29MNW51HO3u1scodvz7lMjt4mBBSShFwkeilPDTTinFQMxR00JYAc2INc');
const { v4: uuidv4 } = require('uuid');

const app = express();

// middleware
app.use(express.json());
app.use(cors());


// routes

app.get('/', (req, res) => {
    res.send('Hello world');
})

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

app.listen(8282, () => {
    console.log('server started on port 8282');
})
