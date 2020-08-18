import React, { Fragment } from 'react';

import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div>Toolbar, sidedrawer, backdrop</div>
      <main className={classes.Content}>{children}</main>
    </Fragment>
  );
};

export default Layout;
