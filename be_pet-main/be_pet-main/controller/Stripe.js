const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
    const { email, price } = req.body;
    if (price < 50) {
        res.json({ 'error': "Amount must be at least $0.50" })
    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
            receipt_email: email
        });
        res.json({ 'client_secret': paymentIntent['client_secret'] })
    }
};