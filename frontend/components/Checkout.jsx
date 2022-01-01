import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CardErrorMessage = styled.p`
  color: red;
  font-size: 1.5rem;
`;
const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const router = useRouter();
  const { closeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: gqlError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    nProgress.start();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(`paymentMethod`, paymentMethod);
    if (error) {
      setError(error);
      return;
    }
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });

    closeCart();

    setLoading(false);
    nProgress.done();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <CardErrorMessage>{error.message}</CardErrorMessage>}
      {gqlError && <CardErrorMessage>{gqlError.message}</CardErrorMessage>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
