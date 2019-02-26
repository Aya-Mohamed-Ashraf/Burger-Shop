import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.cancelCheckoutHandler}
                    checkoutContinued={this.continueCheckoutHanlder} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);