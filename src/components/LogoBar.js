import React from 'react';
import './LogoBar.css';
import VerticalLogo from '../svg/logo_vertical.svg'
import Info from '../svg/info.svg';

class LogoBar extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div className='logo-bar-container'>
                <div className='logo-bar-button-container' onClick={this.props.onInfoButtonClick}><img src={Info} /></div>
                <img src={VerticalLogo} className='vertical-logo'/>
            </div>
        );
    }
}

export default LogoBar;