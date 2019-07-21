import React, {Component} from "react";
import FilterList from "@material-ui/icons/FilterList"; // import filter icon

class NewsFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            country: ""
        }
    }

    // Update values for query and country inputs by adding into state upon any change
    // Essential to creating a controlled component
    handleChange = (event) => {
        // Must grab name of input first because this method works on both text input and select input
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    // NOTE: If form is submitted, NewsFilters will update state of NewsFeed using passed in function!
    render() {
        return (
            <div className="newsFiltersComponent wrapper">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.onFilterSubmit(this.state.query, this.state.country);
                }}>
                    <input name="query" type="text" placeholder="Filter topic..." value={this.state.query} onChange={this.handleChange} />
                    
                    <select name="country" value={this.state.country} onChange={this.handleChange}>
                        <option value="">All Countries</option>
                        <option value="us">U.S.</option>
                        <option value="gb">U.K.</option>
                        <option value="in">India</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="nz">New Zealand</option>
                    </select>
                    
                    <div className="submitContainer">
                        <input type="submit" value="Set Filter" />
                        <FilterList />
                    </div>
                </form>
            </div>
        )
    }
}

export default NewsFilters;