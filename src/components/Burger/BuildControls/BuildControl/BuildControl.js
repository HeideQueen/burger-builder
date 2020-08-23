import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = ({ label, ingredientAdded }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less}>Less</button>
      <button className={classes.More} onClick={ingredientAdded}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
