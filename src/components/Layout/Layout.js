import React, { Fragment } from 'react';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div>Toolbar, sidedrawer, backdrop</div>
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
