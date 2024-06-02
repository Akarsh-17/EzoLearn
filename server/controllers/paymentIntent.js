const stripe = require('stripe')('sk_test_51PI0r5SJXEBwNpKVNPd5YoGDG4Emg2ZcLtPRNJ1zEXFTrU8HdxND7KSIDBx9cf38v5hwM1B5wFmwnScIJrxv30Ot00jxFUYbYp');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
