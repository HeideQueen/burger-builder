import React from 'react';

import classes from './Input.module.css';

function Input(props, { label, inputtype }) {
  let inputElement = null;

  switch (inputtype) {
    case 'input':
      inputElement = <input className={classes.InputElement} {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
