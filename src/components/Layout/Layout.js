import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = ({ isAuthenticated, children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  return (
    <Fragment>
      <Toolbar isAuth={isAuthenticated} toggleMenu={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerCloseHandler}
      />
      <main className={classes.Content}>{children}</main>
    </Fragment>
  );
};

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: token !== null,
});

export default connect(mapStateToProps)(Layout);
