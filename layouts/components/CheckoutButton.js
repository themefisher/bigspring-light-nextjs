import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutButton = ({ formData }) => {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/v1/stripe/reservation-checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        router.push("/error");
      }
    } catch (err) {
      console.error("Error in creating checkout session:", err);
      router.push("/error");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleCheckout}>
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
