import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({
  ingredients,
  checkoutCanceled,
  checkoutContinue,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div
        style={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Burger ingredients={ingredients} />
      </div>

      <Button btnType='Danger' clicked={checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
