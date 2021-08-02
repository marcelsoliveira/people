import React from 'react';
import './ContactListItem.css';
import ChevronRight from '../svg/chevron-right.svg';
import { CSSTransition } from 'react-transition-group';

class ContactListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isMounted: false,
        }
        this.onClickEventHandler = this.onClickEventHandler.bind(this);
    }
    onClickEventHandler() {
        this.props.onClick(this.props.index)
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 100);
    }
    render() {
        return(
            <CSSTransition in={this.state.isMounted}
                apper={true}
                timeout={800}
                classNames='contact-list-item-animation'
                unmountOnExit
            >
                <div className='contact-list-item-container' onClick={this.onClickEventHandler}>
                    <div className='contact-list-item-container-user-photo-container'>
                        <img src={this.props.contactPhoto} />
                    </div>
                    <div className='contact-list-item-user-name'><p>{this.props.firstName}</p><p>{this.props.lastName}</p></div>
                    <div className='contact-list-item-container-chevron-container'>
                        <img src={ChevronRight} />
                    </div>
                    <div className='divider'></div>
                </div>
            </CSSTransition>
            
        );
    }
}

export default ContactListItem;