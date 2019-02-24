import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = null;
        for (let param of query.entries()) {
            if (param[0] === 'price')
                totalPrice = param[1];
            else
                ingredients[param[0]] = + param[1];
        }
        this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHanlder = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <Fragment>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.cancelCheckoutHandler}
                    checkoutContinued={this.continueCheckoutHanlder} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)} />
            </Fragment>
        );
    }
}

export default Checkout;