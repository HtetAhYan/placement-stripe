import { stripe } from '@/server/stripeInstance'
import { prisma } from '@/server/prismaInstance'
import newStudent from '@/server/webhooksHandler';
export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
       line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Placement Test Fee for EDUSN School',
                           
                                // Assuming image URL is directly provided
                            },
                            unit_amount: 100 *100,
                        },
                        quantity: 1,
                    },
        ],
        custom_fields: [
    {
      key: 'studentname',
      label: {
        type: 'custom',
        custom: 'Student Name',
      },
      type: 'text',
    },],
                success_url: `${req.headers.origin}/create-session`,
                cancel_url: `${req.headers.origin}/`,
            };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
// Admin123@