import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // } // the longer version of just state={}

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    isPurchasable() {
        const sum = Object.keys(this.props.ings).map(key => {
            return this.props.ings[key];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledLessButtonInfo = { ...this.props.ings };
        for (let prop in disabledLessButtonInfo) {
            disabledLessButtonInfo[prop] = disabledLessButtonInfo[prop] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>The ingredient cant be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAddHandler={this.props.onIngredientAdded}
                        ingredientRemoveHandler={this.props.onIngredientRemoved}
                        disableLessButtonInfo={disabledLessButtonInfo}
                        price={this.props.totalPrice}
                        purchasable={this.isPurchasable()}
                        ordered={this.purchaseHandler} />
                </Fragment>
            );

            orderSummary = (<OrderSummary
                ingredients={this.props.ings}
                price={this.props.totalPrice}
                cancelClicked={this.purchaseCancelHandler}
                continueClicked={this.purchaseContinueHandler} />);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));