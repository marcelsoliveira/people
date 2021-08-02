import React from 'react';
import './TabList.css';
import TabListItem from './TabListItem';
import Configuration from './configuration.json'

class TabList extends React.Component {
    constructor() {
        super();
        this.unselectTabs = this.unselectTabs.bind(this);
        this.tabs = []
        Configuration.tabs.map((tab) => {
            this.tabs.push({tabText: tab, ref: React.createRef()});
        });
    }
    unselectTabs(selectedTab) {
        this.props.onLetterSelect(selectedTab);
        this.tabs.map((tab) => {
            tab.ref.current.unselectTab();
        });
    }
    render() {
        return(
            <div className='tab-list-container'>
                <div className='top-gradient'></div>
                    { this.tabs.map((tab) => { return <TabListItem ref={tab.ref} tabText={tab.tabText.toUpperCase()} onclick={this.unselectTabs.bind(this)}/>}) }
                <div className='bottom-gradient'></div>
            </div>
        );
    }
}

export default TabList;