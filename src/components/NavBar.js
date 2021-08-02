import React from 'react';
import './NavBar.css';
import SearchSelected from '../svg/search_selected.svg';

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedLetter: "",
            contactCount: undefined,
        };
    }
    setSelectedLetter(letter, contacts) {
        this.setState({selectedLetter: letter.toUpperCase()+letter.toLowerCase()})
        this.setState({contactCount: contacts})
    }
    render() {
        return(
            <div className='nav-bar-container'>
                <div className='nav-bar-selected-character'>{this.state.selectedLetter}</div>
                <div className='nav-bar-contact-counter'>{this.state.contactCount}</div>
                <div className='nav-bat-button-container' onClick={this.props.showSearch}><img src={SearchSelected} /></div>
                <div className='separation-bar'></div>
            </div>
        );
    }
}

export default NavBar;