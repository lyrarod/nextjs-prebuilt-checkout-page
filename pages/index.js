import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    // console.log(query);
    // console.log(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: "0 0 16px #0003",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <img src="/images/pvideo.jpg" alt="Placa de Vídeo" />
          <h1>R$ 5.000,00</h1>
          <button
            type="submit"
            style={{
              background: "steelblue",
              border: "0",
              padding: "8px 24px",
              borderRadius: "4px",
              color: "white",
              boxShadow: "2px 2px 3px #0003",
              cursor: "pointer",
            }}
          >
            Comprar
          </button>
        </div>
      </section>
    </form>
  );
}
