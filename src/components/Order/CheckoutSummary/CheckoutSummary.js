import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'

const checkOutSummary = (props) => {
    
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingridients={props.ingridients}/>
            </div>
            <Button btnType="Danger" >CANCEL</Button>
            <Button btnType="Success" >CONTINUE</Button>
        </div>
    )
}

export default checkOutSummary;