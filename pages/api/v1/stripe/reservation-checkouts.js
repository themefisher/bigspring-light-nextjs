import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Yuzi Retreat Reservation",
                description: "Reserve your spot with a 100% refundable deposit.",
                images: [`${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/yuzi_ring_logo_500x500.png`],
              },
              unit_amount: 10000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/thank-you`,
        cancel_url: `${req.headers.origin}/`,
        billing_address_collection: "auto",
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: "Error creating checkout session" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
