import React from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    renderOrder = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available'; 
        const trnsitionOptions = {
            classNames:"order",
            key,
            timeout:{ enter: 250, exit: 250 }
        };
        //make sure fish are loaded before we continue
        if(!fish)return null;
        
        if(!isAvailable){
           return(
                <CSSTransition {...trnsitionOptions}>
                    <li key={key}>
                        Sorry {fish ? fish.name : 'fish'} is no longer available 
                    </li> 
                </CSSTransition>
           ) 
        }
        return(
            <CSSTransition {...trnsitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup 
                            component="span"
                            className="count"
                        >
                            <CSSTransition 
                                classNames="count"
                                key={count}
                                timeout={{ enter:250, exit:250 }}
                            >
                                <span>{count}</span>
                            </CSSTransition> 
                        </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(count * fish.price)};
                        <button onClick={()=> this.props.removeFromOrder(key)} >&times;</button>
                    </span>
                </li>
            </CSSTransition>
        ) 
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce( (prevTotal, key)=>{
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available'; 
            if(isAvailable){
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div>
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order;