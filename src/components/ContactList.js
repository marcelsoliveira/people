import React from 'react';
import './ContactList.css';
import ContactListItem from './ContactListItem';
import Loader from '../svg/loader.svg';

class ContactList extends React.Component {
    constructor() {
        super();
        this.state = {
            contactsList: [],
            contactsLoaded: false,
        }
        this.receiveContacts = this.receiveContacts.bind(this);
    }
    receiveContacts(contacts) {
        console.log(contacts)
        this.setState({contactsLoaded: false});
        this.setState({contactsList: []});
        setTimeout(() => {
            this.setState({contactsList: contacts});
            this.setState({contactsLoaded: true});
        }, 800);
    }
    render() {
        return(
            <div>
                <div className='contact-list-top-gradient'></div>
                <img src={Loader} className={this.state.contactsLoaded ? 'loader loader-fade' : 'loader'}/>
                <div className='contact-list-container'>
                    { this.state.contactsList.map((contact, idx) => { return <ContactListItem onClick={this.props.onContactClicked} index={idx} contactPhoto={contact.picture.medium} firstName={contact.name.first} lastName={contact.name.last}/>}) }
                </div>
                <div className='contact-list-bottom-gradient'></div>
            </div>
            
        );
    }
}

export default ContactList;