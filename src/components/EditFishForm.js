import React from 'react'

class EditFishForm extends React.Component {
    handleChange = event =>{
        //update fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value 
        };
        this.props.updateFish(this.props.index, updatedFish);
        console.log(updatedFish);
    }
    render() {
        return(
            <form className="fish-edit">   
                <input 
                    name="name" 
                    onChange={this.handleChange}
                    value={this.props.fish.name} 
                    type="text"
                />
                <input 
                    name="price" 
                    onChange={this.handleChange}
                    value={this.props.fish.price}
                    type="text"  
                />
                <select 
                    name="status" 
                    onChange={this.handleChange}
                    value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea 
                    name="desc" 
                    onChange={this.handleChange}
                    value={this.props.fish.desc} 
                />
                <input 
                    name="image" 
                    onChange={this.handleChange}
                    value={this.props.fish.image}  
                    type="text" 
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </form>
        )
    }
}

export default EditFishForm;