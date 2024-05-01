import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import FormButton from '../FormButton';
import FormHeader from '../FromHeader';
import Message from '../Message';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setIsSuccess(false);
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsSuccess(true);
      setMessage(`Payment status: ${paymentIntent.status}`);
    } else {
      setIsSuccess(false);
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <FormHeader title="Payment" />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <FormButton
            disabled={isProcessing || !stripe || !elements}
            title="Pay now"
            disabledTitle="Processing ..."
          />
          {message && <Message title={message} isSuccess={isSuccess} />}
        </form>
      </div>
    </div>
  );
}
