import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }
//Above is created as a blank, so it will set the state of the searchbar's term to the event target's value
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    //Above step 69 passing the state of the term to this.props.onSearch

    handleTermChange(event) {
        this.setState({term: event.target.value})

    } 
    //Above Step 71 - accepts an event argument and sets the state of the search bar's term to the event target's value

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist"
                                        />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
};

export default SearchBar;