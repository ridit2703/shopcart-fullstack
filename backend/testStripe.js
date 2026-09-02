import 'dotenv/config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

try {
  const account = await stripe.accounts.retrieve();

  console.log('✅ Stripe is working!');
  console.log('Stripe account ID:', account.id);
} catch (error) {
  console.error('❌ Stripe error:', error.message);
}
