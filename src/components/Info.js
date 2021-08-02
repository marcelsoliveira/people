import React from 'react';
import './Info.css';
import InfoIcon from '../svg/info.svg';
import Close from '../svg/close.svg';
import LogoSplash from '../svg/logo_splash.svg';
import { CSSTransition } from 'react-transition-group';

class Info extends React.Component {
    constructor() {
        super();
        this.state = {
            isMounted: false
        }
        this.closeInfo = this.closeInfo.bind(this);
    }
    componentDidMount() {
        this.setState({isMounted: true});
    }
    closeInfo() {
        this.setState({isMounted: false});
        this.props.hideInfo();
    }
    render() {
        return(
            <CSSTransition in={this.state.isMounted}
                apper={true}
                timeout={800}
                classNames='info-animation'
                unmountOnExit
            >
                <div className='info-container'>
                    <div className='info-icon-container'><img src={InfoIcon} /></div>
                    <div className='info-close-container'><img src={Close} onClick={this.closeInfo}/></div>
                    <img src={LogoSplash} className='info-logo'/>
                    <div className='info-text-container'>
                        Valtech people is an application designed to be a user interface for the randomuser.me public API. Similarities between persons or locations are purely coincidental. 
                        <div>
                            <h>Version 0.1</h>
                        </div>
                    </div>
                </div>
            </CSSTransition>
            
        );
    }
}
export default Info;