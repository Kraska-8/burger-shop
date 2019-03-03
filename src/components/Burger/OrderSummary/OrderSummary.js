import React, {Component} from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('[OrderSummary] will update');
        
    }
    render(){
        const ingridientSummary = Object.keys(this.props.ingridients)
        .map(igKey =>{
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingridients[igKey]}
            </li>
            )
        })
        return(       
        <>
            <h3>Yout Order</h3>
            <p>Your delicious burger with following ingridients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
    
            <Button
            btnType='Danger'
            clicked={this.props.purchaseCanceled}
             >Cancel</Button>
            <Button
             btnType='Success'
             clicked={this.props.purchaseContinue}
            >Continue</Button>
    
        </> 
        )
    }
}
  

export default OrderSummary