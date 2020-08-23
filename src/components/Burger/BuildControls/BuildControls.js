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

const BuildControls = () => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(({ label }) => (
        <BuildControl key={label} label={label} />
      ))}
    </div>
  );
};

export default BuildControls;
