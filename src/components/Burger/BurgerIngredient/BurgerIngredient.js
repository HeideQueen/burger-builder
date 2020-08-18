import React from 'react';

import classes from './BurgerIngredient.module.css';

const BurgerIngredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case 'bread-top':
      ingredient = (
        <div className={classes.BreadTop}>
          <div className='Seeds1'></div>
          <div className='Seeds2'></div>
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className={classes.Meat}></div>;
      break;
    case 'cheese':
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case 'salad':
      ingredient = <div className={classes.Salad}></div>;
      break;
    case 'bacon':
      ingredient = <div className={classes.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }

  return (
    <div>
      <h1>konlulu~</h1>
    </div>
  );
};

export default BurgerIngredient;
