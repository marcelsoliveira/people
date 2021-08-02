import React from 'react';
import './SplashScreen.css';
import LogoSplash from '../svg/logo_splash.svg';
import Loader from '../svg/loader_splash.svg';
class SplashScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            contentExit: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({contentExit: true})
        }, 4000);
    }
    render() {
        return(
            <div className='splash-screen-container splash-screen-container-exit'>
                <div className='splash-screen-main splash-screen-main-exit '>
                        <img src={LogoSplash} className={this.state.contentExit ? 'splash-screen-logo-container splash-screen-logo-container-enter splash-screen-exit' : 'splash-screen-logo-container splash-screen-logo-container-enter'}/>
                </div>
                    <img src={Loader} className={this.state.contentExit ? 'splash-loader splash-screen-logo-container-enter splash-screen-exit':'splash-loader splash-screen-logo-container-enter'}/>
                <div  className={this.state.contentExit ? 'powered-container  splash-screen-logo-container-enter splash-screen-exit' : 'powered-container  splash-screen-logo-container-enter'}>
                    powered by <h>randomuser.me</h>
                </div>
               
            </div>
        );
    }
}

export default SplashScreen;