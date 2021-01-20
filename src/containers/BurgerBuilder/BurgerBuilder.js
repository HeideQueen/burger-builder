import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((i) => ingredients[i])
      .reduce((acc, val) => acc + val, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push({
      pathname: '/checkout',
    });
  };

  const disabledInfo = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = <Spinner />;

  if (props.ings) {
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        continueOrder={purchaseContinueHandler}
        cancelOrder={purchaseCancelHandler}
        total={props.totalPrice}
      />
    );
  }

  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          addIngredient={props.onAddIngredient}
          removeIngredient={props.onRemoveIngredient}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

const mapStateToProps = ({
  burgerBuilder: { ingredients, totalPrice, error },
  auth: { token },
}) => ({
  ings: ingredients,
  totalPrice: totalPrice,
  error: error,
  isAuthenticated: token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onAddIngredient: (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName)),
  onRemoveIngredient: (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredient()),
  onInitPurchase: () => dispatch(actions.initIngredient),
  onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
