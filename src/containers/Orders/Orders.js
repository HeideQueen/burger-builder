import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = ({
  token,
  userId,
  loading,
  orders,
  onFetchOrders,
  onFetchOrdersStart,
}) => {
  useEffect(() => {
    onFetchOrders(token, userId);
    onFetchOrdersStart();
  }, [onFetchOrders, onFetchOrdersStart, token, userId]);

  const order = loading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map(({ ingredients, price, id }) => (
        <Order ingredients={ingredients} price={price} key={id} />
      ))}
    </div>
  );

  return order;
};

const mapStateToProps = ({
  order: { orders, loading },
  auth: { token, userId },
}) => ({
  orders,
  loading,
  token,
  userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) =>
    dispatch(actions.fetchOrders(token, userId)),
  onFetchOrdersStart: () => dispatch(actions.fetchOrdersStart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
