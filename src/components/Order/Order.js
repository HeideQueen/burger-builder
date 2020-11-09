import React from 'react';

import classes from './Order.module.css';

const Order = ({ ingredients, price }) => {
  const transformedIngredients = [];

  for (let ingredientName in ingredients) {
    transformedIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  const ingredientOutput = transformedIngredients.map((ig) => (
    <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>${Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
