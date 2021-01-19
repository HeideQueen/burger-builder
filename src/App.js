import React, { useEffect, Suspense } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = ({ onTryAutoSignup, isAuthenticated }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path='/auth' render={() => <Auth />} />
      <Route path='/' component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' render={() => <Checkout />} />
        <Route path='/orders' render={() => <Orders />} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={() => <Auth />} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
