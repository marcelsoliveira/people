import React from 'react';
import axios from "axios";
import Configuration from './configuration.json'

class ContactFetcher extends React.Component {
    constructor() {
        super();
        this.state = {
            serverResponse: null,
        }
        this.fetchContacts = this.fetchContacts.bind(this);
        this.processContacts = this.processContacts.bind(this);
        this.packContacts = this.packContacts.bind(this);
    }
    async fetchContacts() {

        let queryUrl = Configuration.userUrl + "/api/?nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,nl,nz,us&results=";
        let fullQuery = queryUrl + Configuration.numberCards.toString();
        console.log(fullQuery)
        await axios.get(fullQuery).then((response) => {this.state.serverResponse = this.processContacts(response.data.results)}).catch((error) => {this.state.serverResponse = error});
        return this.state.serverResponse;
    }
    processContacts(contacts) {    
        return this.packContacts(contacts.sort(function(a, b) {
            function compareLastNames(a, b) {           
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            }
            return compareLastNames(a.name.last, b.name.last);
        }));
    }
    packContacts(sortedContacts) {
        let packedContacts = [];
        Configuration.tabs.forEach((tab) => {
            packedContacts[tab] = []
            sortedContacts.forEach((contact) => {
                if(contact.name.last.toLowerCase()[0] === tab) {
                    packedContacts[tab].push(contact)
                }
            });
            sortedContacts.splice(0,packedContacts[tab].length)
        });
        return packedContacts;
    }
    render() {
        return null;
    }
}

export default ContactFetcher;