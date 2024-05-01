import { useEffect, useState } from 'react';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/CheckoutForm';
import { useAuth } from '../../hooks/useAuth';

export default function Charge() {
  const { user } = useAuth();
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const paymentConfig = async () => {
      const response = await fetch('http://localhost:8000/api/payment-config', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      const { publishableKey } = await response.json();
      const stripeInstance = await loadStripe(publishableKey);

      setStripePromise(stripeInstance);
    };

    paymentConfig();
  }, []);

  useEffect(() => {
    const createaPaymentIntent = async () => {
      const response = await fetch(
        'http://localhost:8000/api/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const { clientSecret } = await response.json();

      setClientSecret(clientSecret);
    };

    createaPaymentIntent();
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
