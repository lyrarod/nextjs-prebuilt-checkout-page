const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("REQ HEADERS:", req.headers);

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["boleto", "card"],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1K8vn0DTtNHAJwwnq6SgslT8",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      console.log(session);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
