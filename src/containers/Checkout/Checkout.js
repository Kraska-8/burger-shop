import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingridients: {
            cheese: 1,
            bacon: 1, 
            meat: 1,
            salad: 1
        }

    }
    render(){
        return(
            <div>
                <CheckoutSummary ingridients={this.state.ingridients}/>
            </div>
        )
    }
}

export default Checkout;