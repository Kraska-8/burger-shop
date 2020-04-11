import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const ingridientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    state = {
        ingridients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-react-dcb25.firebaseio.com/ingridients.json')
            .then(response => {
                this.setState({ingridients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseState(ingridients) {
        const sum = Object.keys(ingridients)
        .map(igKey => {
            return ingridients[igKey]
        })
        .reduce((sum,el) => {
            return sum + el
        }, 0);
        this.setState({purchaseable: sum > 0});
    };

    addIngridientHandler = type => {
        const oldCount = this.state.ingridients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCounted;
        const priceAddition = ingridientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingridients:updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    };

    removeIngridientHandler = type => {
        const oldCount = this.state.ingridients[type];
        if (oldCount <= 0){
            return
        }
        const updatedCounted = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCounted;
        const priceDeduction = ingridientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => { 
        const queryParams = [];
        for(let i in this.state.ingridients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridients[i]))
        };
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };
        let orderSummary = null;
        let burger =  this.state.error ? <p>Ingridients can't be loaded!</p> : <Spinner/>
        if (this.state.ingridients){
            burger =  (
                <>
                    <Burger ingridients = {this.state.ingridients}/>
                    <BuildControls
                    ingridientAdded = {this.addIngridientHandler}
                    ingridientRemoved = {this.removeIngridientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchaseable = {this.state.purchaseable}
                    ordered = {this.purchaseHandler}
                    />
                </>
            );
            orderSummary = <OrderSummary 
            ingridients = {this.state.ingridients}
            purchaseCanceled = {this.purchaseCancelHandler}
            purchaseContinue ={this.purchaseContinueHandler}
            totalPrice ={this.state.totalPrice}
            />  
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
      
        return (
            <>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);