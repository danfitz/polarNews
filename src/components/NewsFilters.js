import React, {Component} from "react";
import FilterList from "@material-ui/icons/FilterList";

class NewsFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            country: ""
        }
    }

    handleChange = (event) => {
        console.log(event.target);
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    // handleSelect = (event) => {
    //     console.log(event);
    //     this.setState({
    //         country: event.target.value
    //     })
    // }

    render() {
        return (
            <div className="newsFiltersComponent wrapper">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.onFilterSubmit(this.state.query, this.state.country);
                }}>
                    <input name="query" type="text" placeholder="Filter Topic..." value={this.state.query} onChange={this.handleChange} />
                    
                    <select name="country" value={this.state.country} onChange={this.handleChange}>
                        <option value="">All Countries</option>
                        <option value="us">U.S.</option>
                        <option value="gb">U.K.</option>
                        <option value="in">India</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="nz">New Zealand</option>
                    </select>
                    
                    <input type="submit" value="Set Filter" /><FilterList />
                </form>
            </div>
        )
    }
}

export default NewsFilters;