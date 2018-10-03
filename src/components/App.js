import React from 'react'
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes'; 
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
    state = {
        fishes:{},
        order:{}
    };

    componentDidMount(){
        const  { params } = this.props.match;
        // 1. reinstate the local storage
        const localStorageRef = localStorage.getItem(params.storeID);
        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        console.log(params.storeID);
        this.ref = base.syncState(`${ params.storeID }/fishes`,{
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate(){
        console.log(this.state.order);
        localStorage.setItem(
            this.props.match.params.storeID,
            JSON.stringify(this.state.order)
        );        
    }
    
    componentWillUnmount(){
         base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        //1. Take a copy of the existing state
        const fishes = {...this.state.fishes}; // object spread 
        //2. Add new Fish to fishes object
        fishes[`fish${Date.now()}`] = fish;
        //3. set the new fishes object new fishes
        this.setState({ fishes }); 
    };

    updateFish = (key, updatedFish)=>{
        //1.Take a copy of the existing state
        const fishes = {...this.state.fishes};
        //2.Update the fish in fishes object
        fishes[key] = updatedFish;
        //3.Set the fishes to updated fishes 
        this.setState({ fishes });
    };

    deleteFish = (key) =>{
        //1.Take a copy of the existing state
        const fishes = {...this.state.fishes};
        //2.delete the fish
        fishes[key] = null;
        //3.Set the fishes to updated fishes 
        this.setState({ fishes });
    }

    loadSampleFishes = () =>{
        this.setState({ fishes: sampleFishes});
    };

    addToOrder = (key) =>{
        //1. Take a copy of the existing state
        const order = {...this.state.order};
        //2. Add a fish to order or update the number of fish in order
        order[key] = order[key] + 1 || 1;
        //3. call set state to set the order in state
         this.setState({ order }); 
    }

    // updateToOrder = (key, updatedOrder) => { 
    //     //1.Take a copy of the existing state
    //     const order = {...this.state.order};
    //     //2.Update the fish in fishes object
    //     order[key] = updatedOrder;
    //     //3.Set the fishes to updated fishes 
    //     this.setState({ order });
    // } 

    removeFromOrder = (key) =>{
        //1.Take a copy of the existing state
        const order = {...this.state.order};
        //2.delete the fish
        delete order[key];
        //3.Set the fishes to updated fishes 
        this.setState({ order });
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className = "menu">
                    <Header tagline="Fresh seafood market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish 
                            key={key}
                            index={key} 
                            details={this.state.fishes[key]} 
                            addToOrder={this.addToOrder}
                        />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    />
            </div>
        )
    }
}

export default App;