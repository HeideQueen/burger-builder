import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
    this.props.onFetchOrdersStart();
  }

  render() {
    const order = this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map(({ ingredients, price, id }) => (
          <Order ingredients={ingredients} price={price} key={id} />
        ))}
      </div>
    );

    return order;
  }
}

const mapStateToProps = ({ order: { orders, loading } }) => ({
  orders: orders,
  loading: loading,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(actions.fetchOrders()),
  onFetchOrdersStart: () => dispatch(actions.fetchOrdersStart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
