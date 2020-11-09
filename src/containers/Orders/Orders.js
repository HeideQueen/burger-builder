import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(({ ingredients, price, id }) => (
          <Order ingredients={ingredients} price={price} key={id} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
