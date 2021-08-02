import React from 'react';
import './TypeFaces.css';
import ContactFetcher from './ContactsFetcher';
import LogoBar from './LogoBar';
import TabList from './TabList';
import NavBar from './NavBar';
import ContactList from './ContactList';
import ContactInfo from './ContactInfo';
import Search from './Search';
import stringSimilarity from "string-similarity";
import SplashScreen from './SplashScreen';
import ContactListEmptyState from './ContactListEmptyState';
import Info from './Info'

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: undefined,
            selectedLetter: "a",
            showContactInfo: false,
            selectedPersonPhoto: undefined,
            selectedPersonFirstName: "",
            selectedPersonLastName: "",
            selectedPersonPhoneNumber: "",
            selectedPersonPhoneEmail: "",
            selectedPersonGender: "",
            selectedPersonAge: 0,
            selectedPersonDOB: "",
            selectedPersonStreet: "",
            selectedPersonNumber: 0,
            selectedPersonCity: "",
            selectedPersonState: "",
            selectedPersonPostCode: "",
            selectedPersonCountry: "",
            selectedPersonRegistrationDate: "",
            searchResults: [],
            showSearch: false,
            hideSplashScreen: false,
            showEmptyState: false,
            showInfo: false,
        }
        this.ContactFetcher = React.createRef();
        this.NavBar = React.createRef();
        this.ContactList = React.createRef();
        this.ContactInfo = React.createRef();
        this.Search = React.createRef();
        this.setSelectedLetter = this.setSelectedLetter.bind(this);
        this.showContactInfo = this.showContactInfo.bind(this);
        this.closeContactInfo = this.closeContactInfo.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.showSearchResult = this.showSearchResult.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.finishSplashScreen = this.finishSplashScreen.bind(this);
        this.showEmptyState = this.showEmptyState.bind(this);
        this.hideEmptyState = this.hideEmptyState.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }
    componentDidMount() {
        this.ContactFetcher.current.fetchContacts().then((response) => {
            this.setState({contacts: response});
            this.NavBar.current.setSelectedLetter('A', this.state.contacts['a'].length);
            this.ContactList.current.receiveContacts(this.state.contacts['a']);
        });
        this.finishSplashScreen();
    }
    showEmptyState() {
        this.setState({showEmptyState: true});
    }
    hideEmptyState() {
        this.setState({showEmptyState: false});
    }
    finishSplashScreen() {
        setTimeout(() => {
            this.setState({hideSplashScreen: true});
        }, 6000);
    }
    setSelectedLetter(letter) {
        this.setState({selectedLetter: letter.toLowerCase()});
        this.NavBar.current.setSelectedLetter(letter, this.state.contacts[letter.toLowerCase()].length);
        if(this.state.contacts[letter.toLowerCase()].length == 0) {
            this.showEmptyState();
        } else {
            this.hideEmptyState();
            this.ContactList.current.receiveContacts(this.state.contacts[letter.toLowerCase()]);
        }
        
    }
    showContactInfo(index) {
        let person = this.state.contacts[this.state.selectedLetter][index];
        this.setState({selectedPersonPhoto: person.picture.large})
        this.setState({selectedPersonFirstName: person.name.first})
        this.setState({selectedPersonLastName: person.name.last})
        this.setState({selectedPersonPhoneNumber: person.phone})
        this.setState({selectedPersonPhoneEmail: person.email})
        this.setState({selectedPersonGender: person.gender})
        this.setState({selectedPersonAge: person.dob.age})
        this.setState({selectedPersonDOB: person.dob.date.split("T")[0]})
        this.setState({selectedPersonStreet: person.location.street.name})
        this.setState({selectedPersonNumber: person.location.street.number})
        this.setState({selectedPersonCity: person.location.city})
        this.setState({selectedPersonState: person.location.state})
        this.setState({selectedPersonPostCode: person.location.postcode})
        this.setState({selectedPersonCountry: person.location.country})
        this.setState({selectedPersonRegistrationDate: person.registered.date.split("T")[0]})
        this.setState({showContactInfo: true});
    }
    closeContactInfo() {
        setTimeout(() => {
            this.setState({showContactInfo: false});
        }, 300);        
    }
    showSearch() {
        this.setState({showSearch: true});
    }
    closeSearch() {
        setTimeout(() => {
            this.setState({showSearch: false});
              let contactsFound = [];
            this.setState({searchResults: contactsFound}); 
        }, 100);        
    }
    performSearch(e) {
        let contactList = this.state.contacts;
        let contactsFound = [];
        for(const [letter, contacts] of Object.entries(contactList)) {
            for(const [index, contact] of Object.entries(contacts)) {
                let lastNameMatch = stringSimilarity.compareTwoStrings(contact.name.last.toLowerCase(), e.target.value.toLowerCase());
                let firstNameMatch = stringSimilarity.compareTwoStrings(contact.name.first.toLowerCase(), e.target.value.toLowerCase());
                if(lastNameMatch >= 0.6) {
                    contactsFound.push({Letter: letter, Index: index, Contact: contact});
                }
                if(firstNameMatch >= 0.6) {
                    contactsFound.push({Letter: letter, Index: index, Contact: contact});
                }
            }
        }
        this.setState({searchResults: contactsFound});        
    }
    showSearchResult(letter, index) {
        this.setState({selectedLetter: letter}, function() {
            this.showContactInfo(index)
        })
    }
    hideInfo() {
        setTimeout(() => {
            this.setState({showInfo: false})
        }, 500);
    }
    showInfo() {
        this.setState({showInfo: true})
    }
    render() {
        return(
            <div>
                <ContactFetcher ref={this.ContactFetcher} />
                <LogoBar onInfoButtonClick={this.showInfo}/>
                <TabList onLetterSelect={this.setSelectedLetter} />
                <NavBar ref={this.NavBar} showSearch={this.showSearch}/>
                <ContactList ref={this.ContactList} onContactClicked={this.showContactInfo}/>
                {this.state.showEmptyState ? <ContactListEmptyState /> : undefined}
                {this.state.showContactInfo ? <ContactInfo ref={this.ContactInfo} 
                                                picture={this.state.selectedPersonPhoto}
                                                firstName={this.state.selectedPersonFirstName}
                                                lastName={this.state.selectedPersonLastName}
                                                phone={this.state.selectedPersonPhoneNumber}
                                                email={this.state.selectedPersonPhoneEmail}
                                                gender={this.state.selectedPersonGender}
                                                age={this.state.selectedPersonAge}
                                                dob={this.state.selectedPersonDOB}
                                                street={this.state.selectedPersonStreet}
                                                number={this.state.selectedPersonNumber}
                                                city={this.state.selectedPersonCity}
                                                state={this.state.selectedPersonState}
                                                postCode={this.state.selectedPersonPostCode}
                                                country={this.state.selectedPersonCountry}
                                                registrationDate={this.state.selectedPersonRegistrationDate}
                                                hideContactInfo={this.closeContactInfo}
                                                /> : undefined}
                {this.state.showSearch ? <Search ref={this.Search} onSearch={this.performSearch} foundContacts={this.state.searchResults} onContactClicked={this.showSearchResult} onHideSearch={this.closeSearch}/> : undefined }
                {this.state.hideSplashScreen ? undefined : <SplashScreen /> }
                {this.state.showInfo ? <Info hideInfo={this.hideInfo}/> : undefined }
            </div>
        );
    }
}

export default Main;