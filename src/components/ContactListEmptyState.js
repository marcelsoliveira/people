import React from 'react';
import './ContactListEmptyState.css';

import NoContactFound from '../svg/account-alert.svg';

class ContactListEmptyState extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div className='empty-state-container empty-state-enter '>
                <div className='empty-state-message-container'>
                    <img src={NoContactFound} />
                    <div className='empty-state-message'>No contact register with this initial.</div>
                </div>
            </div>
        );
    }
}
export default ContactListEmptyState;