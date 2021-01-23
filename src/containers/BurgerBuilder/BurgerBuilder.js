import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const dispatch = useDispatch();

  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onAddIngredient = (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName));
  const onRemoveIngredient = (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredient()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.initIngredient);
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

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
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push({
      pathname: '/checkout',
    });
  };

  const disabledInfo = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = <Spinner />;

  if (ings) {
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        continueOrder={purchaseContinueHandler}
        cancelOrder={purchaseCancelHandler}
        total={price}
      />
    );
  }

  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ings) {
    burger = (
      <Fragment>
        <Burger ingredients={ings} />
        <BuildControls
          addIngredient={onAddIngredient}
          removeIngredient={onRemoveIngredient}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
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

export default withErrorHandler(BurgerBuilder, axios);
