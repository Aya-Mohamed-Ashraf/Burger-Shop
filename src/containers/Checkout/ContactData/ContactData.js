import React, { Component } from 'react';
import axios from '../../../axios-orders';
import cssClasses from './ContactData.module.css';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
                this.setState({ loading: false });
                this.props.history.push('/');
            }).catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={cssClasses.Input} type="text" name="name" placeholder="Your Name" />
                <input className={cssClasses.Input} type="email" name="email" placeholder="Your Email" />
                <input className={cssClasses.Input} type="text" name="street" placeholder="Street" />
                <input className={cssClasses.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter ypour contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;