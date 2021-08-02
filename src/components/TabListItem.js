import React from 'react';
import './TabListItem.css';

class TabListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isSelected: false,
        }
        this.unselectTab = this.unselectTab.bind(this);
        this.selectTab = this.selectTab.bind(this);
    }
    componentDidMount() {
        if(this.props.tabText == 'A') {
            this.selectTab();
        }
    }
    unselectTab() {
        this.setState({isSelected: false})
    }
    selectTab() {
        this.setState({isSelected: true})
    }
    render() {
        return(
            <div className='tab-list-item' onClick={() => {this.props.onclick(this.props.tabText); this.selectTab()}}>
                <div className={this.state.isSelected ? 'tab-list-item-ring-selected' : 'tab-list-item-ring'}></div>
                <h1 className={this.state.isSelected ? 'tab-list-item-h1-selected' : 'tab-list-item-h1-unselected'}>{this.props.tabText}</h1>
            </div>
        );
    }
}
export default TabListItem;