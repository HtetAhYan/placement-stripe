import getRawBody from "raw-body";
import { stripe } from "./stripeInstance";
import { prisma } from "./prismaInstance";
import generate_token from "./tokenGenerator";

export const webhooksHandler = async (req, res) => {
      function getCurrentTimestamp () {
  return Date.now()
}
    const token = generate_token();
    try {
        const rawBody = await getRawBody(req);
        const sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOKS_KEY);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const newStudent = await prisma.student.create({
                data: {
                    name: session.customer_details.name,
                    email: session.customer_details.email,
                   
                    createdAt: getCurrentTimestamp(),
                    
                }
            });

 // Store the newStudent object
console.log(session);

            res.status(200).json({ success: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "An error occurred" });
    }
};

// Export a function that returns a promise resolving to the stored newStudent object
