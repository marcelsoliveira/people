import React from 'react';

import ContactFetcher from './ContactsFetcher';

class Main extends React.Component {
    constructor() {
        super();
        this.ContactFetcher = React.createRef();
    }
    componentDidMount() {
        this.ContactFetcher.current.fetchContacts().then((response) => console.log(response));
    }
    render() {
        return(
            <div>
                <ContactFetcher ref={this.ContactFetcher}/>
            </div>
        );
    }
}

export default Main;