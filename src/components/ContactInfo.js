import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './ContactInfo.css';
import ChevronLeft from '../svg/chevron-left.svg';
import Phone from '../svg/phone-classic.svg';
import Call from '../svg/phone.svg';
import Email from '../svg/email.svg';
import Person from '../svg/person.svg';
import Age from '../svg/age.svg'
import DateOfBirth from '../svg/dob.svg';
import Location from '../svg/location.svg'
import ShareContact from '../svg/share_contact.svg';

class ContactInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            showContactInfo: false,
            contactPhoto: null

        }
        this.contactImage = React.createRef();
        this.closeContactInfo = this.closeContactInfo.bind(this);
        this.shareContact = this.shareContact.bind(this);
        this.convertImageToBase64 = this.convertImageToBase64.bind(this);
        this.createShareLink = this.createShareLink.bind(this);
        this.callContact = this.callContact.bind(this);
    }
    callContact() {
        window.open('tel:' + this.props.phone);
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({showContactInfo: true});
            this.convertImageToBase64();
        }, 300);
        
    }
    closeContactInfo() {
        this.setState({showContactInfo: false});
        this.props.hideContactInfo();
    }
    shareContact() {
        let vCardsJS = require('vcards-js');
        let vCard = vCardsJS();
        vCard.firstName = this.props.firstName;
        vCard.lastName = this.props.lastName;
        vCard.photo.embedFromString(this.state.contactPhoto, 'JPEG');
        vCard.workPhone = this.props.phone;
        vCard.birthday = new Date(this.props.dob);
        vCard.email = this.props.email
        vCard.homeAddress = this.props.street + " " + this.props.number + " " + this.props.city + " " + this.props.state + " " + this.props.postCode + " " + this.props.country;
        this.createShareLink(vCard);
    }
    createShareLink(vCardData) {
        var str = vCardData.getFormattedString();
        var uri = 'data:text/x-vcard;urlencoded,' + str;
        var downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = this.props.firstName + "_" + this.props.lastName + ".vcf";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    convertImageToBase64() {
      //pass
    }
    render() {
        return (
            <CSSTransition in={this.state.showContactInfo}
                apper={true}
                timeout={800}
                classNames='contact-info-animation'
                unmountOnExit
            >
                <div className='contact-info-container'>
                    <div className='contact-info-nav-bar'>
                        <div className='back-button-container' onClick={this.closeContactInfo}><img src={ChevronLeft} /></div>
                        <div className='back-button-container' style={{"float": "right"}} onClick={this.shareContact}><img src={ShareContact} /></div>
                        <div className='back-button-container' style={{"float": "right"}} onClick={this.callContact}><img src={Call} /></div>
                        <div className='contact-foto-and-name-container'>
                            <div className='contact-info-foto-container '><img ref={this.contactImage} src={this.props.picture} /></div>
                            <div className='contact-info-item-user-name'><p>{this.props.firstName}</p><p>{this.props.lastName}</p></div>
                        </div>
                    </div>
                    <div className='contact-info-data-container'>
                        <div className='contact-info-secion-title contact-title-enter'>Contact</div>
                        <div className='contact-info-item-container phone-number-enter'>
                            <div className='back-button-container' style={{"height": "50pt"}}><img src={Phone} /></div>
                            <div className='contact-info-item-title'>Phone number</div>
                            <div className='contact-info-item-value'>{this.props.phone}</div>
                            <div className='contact-info-item-divider'></div>
                        </div>
                        <div className='contact-info-item-container email-number-enter'>
                            <div className='back-button-container' style={{"height": "50pt"}}><img src={Email} /></div>
                            <div className='contact-info-item-title'>Email</div>
                            <div className='contact-info-item-value'>{this.props.email}</div>
                            <div className='contact-info-item-divider'></div>
                        </div>
                        <div className='contact-info-secion-title personal-enter'>Personal information</div>
                        <div className='contact-info-item-container gender-enter'>
                            <div className='back-button-container' style={{"height": "50pt"}}><img src={Person} /></div>
                            <div className='contact-info-item-title'>Gender</div>
                            <div className='contact-info-item-value'>{this.props.gender}</div>
                            <div className='contact-info-item-divider'></div>
                        </div>
                        <div className='contact-info-item-container age-enter'>
                            <div className='back-button-container' style={{"height": "50pt"}}><img src={Age} /></div>
                            <div className='contact-info-item-title'>Age</div>
                            <div className='contact-info-item-value'>{this.props.age}</div>
                            <div className='contact-info-item-divider'></div>
                        </div>
                        <div className='contact-info-item-container dob-enter'>
                            <div className='back-button-container' style={{"height": "50pt"}}><img src={DateOfBirth} /></div>
                            <div className='contact-info-item-title'>Date of birth</div>
                            <div className='contact-info-item-value'>{this.props.dob}</div>
                            <div className='contact-info-item-divider'></div>
                        </div>
                        <div className='contact-info-secion-title location-enter'>Address</div>
                        <div className='contact-info-item-container address-enter'>
                            <div className='back-button-container' style={{"height": "50pt"}}><img src={Location} /></div>
                            <div className='contact-info-item-title'>Full Address</div>
                            <div className='contact-info-item-value-address'>{this.props.street}, {this.props.number}</div>
                            <div className='contact-info-item-value-address'>{this.props.city}, {this.props.state}</div>
                            <div className='contact-info-item-value-address'>{this.props.postCode}, {this.props.country}</div>
                        </div>
                        <div className='contact-registration-date'>Contact registered at: {this.props.registrationDate}</div>
                    </div>
                    <div className='contact-info-bottom-gradient'></div>
                    <div className='contact-info-top-gradient'></div>
                </div>
            </CSSTransition>
        );
    }
}

export default ContactInfo;