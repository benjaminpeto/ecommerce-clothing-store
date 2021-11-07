import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51JrLZfDxiAFUPNm2SIZVaLQNAj91cYLNCVOrrCRKbrB4dvvfmTKxorQjFruFZ1Cr6j0Mzh1fSHONFbhpRfRUXBiL00GcLimBWO';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing SL'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;