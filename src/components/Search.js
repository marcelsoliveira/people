import React from 'react';
import './Search.css';
import Close from '../svg/close.svg';
import SearchIcon from '../svg/search_selected.svg';
import ContactListItem from './ContactListItem';
import { CSSTransition } from 'react-transition-group';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            clearList: false,
            showSearch: false,
        }
        this.passClickedSearchResult = this.passClickedSearchResult.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }
    passClickedSearchResult(result) {
        this.props.onContactClicked(result.Letter, result.Index);
        this.closeSearch();
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({showSearch: true});
        }, 200);
    }
    closeSearch() {
        this.setState({showSearch: false});
        this.props.onHideSearch();
    }
    render() {
        return(
            <CSSTransition in={this.state.showSearch}
                apper={true}
                timeout={800}
                classNames='search-animation'
                unmountOnExit
            >
                <div className='search-container'>
                    <div className='search-bar-container'>
                        
                        <div className='search-bar-button-container' onClick={this.closeSearch}>
                            <img src={Close} />
                        </div>
                        <div className='search-bar-button-container' style={{'opacity':'1', 'float':'left', 'width': '60pt'}}>
                            <img src={SearchIcon} />
                        </div>
                        <input type='text' placeholder="Contact name" onChange={this.props.onSearch} />
                    </div>
                    <div className='search-bar-separation-bar'></div>
                    <div className='search-results-container'>
                        {this.state.clearList? undefined : this.props.foundContacts.map((result, idx) => { return <ContactListItem onClick={() =>this.passClickedSearchResult(result)} index={idx} contactPhoto={result.Contact.picture.medium} firstName={result.Contact.name.first} lastName={result.Contact.name.last}/>}) }
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

export default Search;