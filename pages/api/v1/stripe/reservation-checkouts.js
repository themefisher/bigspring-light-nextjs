import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const priceId = "price_1O5E9zL677QhnBEOYzrVkZjx";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await stripe.checkout.sessions.create({})
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
