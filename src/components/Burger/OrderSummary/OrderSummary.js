import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, continueOrder, cancelOrder }) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
      {ingredients[igKey]}
    </li>
  ));

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={cancelOrder}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={continueOrder}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
