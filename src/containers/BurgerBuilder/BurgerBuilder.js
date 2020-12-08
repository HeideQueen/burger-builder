import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actionTypes from '../../store/actions';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get('https://react-my-burger-c5d8c.firebaseio.com/ingredients.json')
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((i) => ingredients[i])
      .reduce((acc, val) => acc + val, 0);

    this.setState({
      purchasable: sum > 0,
    });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i])
      );
    }

    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner />;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          continueOrder={this.purchaseContinueHandler}
          cancelOrder={this.purchaseCancelHandler}
          total={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ ingredients, totalPrice }) => ({
  ings: ingredients,
  totalPrice: totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  onAddIngredient: (ingredientName) =>
    dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredientName,
    }),
  onRemoveIngredient: (ingredientName) =>
    dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredientName,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
