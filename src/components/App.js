import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

class App extends React.Component{
    state = {
        fishes:{},
        order:{}
    };
    addFish = (fish) => {
        //1. Take a copy of the existing state
        const fishes = {...this.state.fishes} // object spread 
        //2. Add new Fish to fishes object
        fishes[`fish${Date.now()}`] = fish;
        //3. set the new fishes object new fishes
        this.setState({ fishes }); 
    };
    render(){
        return (
            <div className="catch-of-the-day">
                <div className = "menu">
                    <Header tagline="Fresh seafood market"/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} />
            </div>
        )
    }
}

export default App;