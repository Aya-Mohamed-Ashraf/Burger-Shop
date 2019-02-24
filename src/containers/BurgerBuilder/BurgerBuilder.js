import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // } // the longer version of just state={}

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-shop.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(err => {
                this.setState({ error: err });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const newTotalPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
        this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0)
            return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const newTotalPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
        this.setState({ totalPrice: newTotalPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Aya Ashraf',
                address: {
                    country: 'Egypt',
                    zipCode: '12345'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            }).catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        const disabledLessButtonInfo = { ...this.state.ingredients };
        for (let prop in disabledLessButtonInfo) {
            disabledLessButtonInfo[prop] = disabledLessButtonInfo[prop] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>The ingredient cant be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAddHandler={this.addIngredientHandler}
                        ingredientRemoveHandler={this.removeIngredientHandler}
                        disableLessButtonInfo={disabledLessButtonInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Fragment>
            );

            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);