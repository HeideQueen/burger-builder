import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
  {
    label: 'Salad',
    type: 'salad',
  },
  {
    label: 'Bacon',
    type: 'bacon',
  },
  {
    label: 'Cheese',
    type: 'cheese',
  },
  {
    label: 'Meat',
    type: 'meat',
  },
];

const BuildControls = ({
  addIngredient,
  removeIngredient,
  disabled,
  price,
  purchasable,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${price.toFixed(2)}</strong>
      </p>
      {controls.map(({ label, type }) => (
        <BuildControl
          key={label}
          label={label}
          ingredientAdded={() => addIngredient(type)}
          ingredientRemoved={() => removeIngredient(type)}
          disabled={disabled[type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!purchasable}>
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
