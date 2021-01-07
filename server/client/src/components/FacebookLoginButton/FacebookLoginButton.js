import React, { Component } from 'react';
import './FacebookLoginButton.scss'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginByFaceGoogle, storeInfoForRegister } from '../../actions/user_action'

class GoogleLoginButton extends Component {

    state = {
        authFailed: false,
        name: "",
        email: "",
        picture: "",
    }

    componentClicked = () =>{
        console.log("Facebook Authentication");
    }

    responseFacebook = (response) =>{
        if (response) {
            console.log(response);
            this.props.dispatch(loginByFaceGoogle(response.email))
            .then(res => {
                if (res.payload.success) {
                    this.props.history.push('/Dashboard')
                }else {
                    // console.log(response)
                    // let data = {
                    //     name: response.name,
                    //     email: response.email,
                    //     picture: response.image.url,
                    // }
                    // this.props.dispatch(storeInfoForRegister(data));
                    this.props.history.push('/register_login');
                }
            });
        }
        else {
            console.log(response)
        }
    }

    responseGoogle = (response) =>  {
        console.log(response)
    }

    render() {
        let template;
        this.state.authFailed?
            template =(
                <div>
                </div>
            )
        : template = (
            <FacebookLogin
                appId="1075917512835265"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook}
                render={renderProps => (
                    <button className='facebook_signin_button' onClick={renderProps.onClick}>
                        <img src={require('../../asset/login-page/fb_Icon2x.png')} />Đăng nhập bằng Facebook
                    </button>
                )}
            />
        );
        return (
           <>
                {template}
           </>
        );
    }
}

export default connect()(withRouter(GoogleLoginButton));