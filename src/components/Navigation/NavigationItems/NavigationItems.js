import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = ({ isAuthenticated }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link='/logout'>Logout</NavigationItem>
      ) : (
        <NavigationItem link='/auth'>Login</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
