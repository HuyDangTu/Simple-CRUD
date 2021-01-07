import React, { Component } from 'react';
import './LoginButton.scss'
import GoogleLogin from 'react-google-login';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginByFaceGoogle, storeInfoForRegister } from '../../actions/user_action';
import { Button, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
class GoogleLoginButton extends Component {

    state = {
        authFailed: false,
        name: "",
        email: "",
        picture: "",
        setSnack: false
    }

    componentClicked = () => {
        console.log("Google Authentication");
    }

    loginByGooggle = (response) => {
        if (response) {
            console.log(response);
            this.props.dispatch(loginByFaceGoogle(response.profileObj.email))
                .then(res => {
                    if (res.payload.success) {
                        this.props.history.push('/Dashboard')
                    } else {
                        // console.log(response)
                        // let data = {
                        //     name: response.profileObj.familyName + " " + response.profileObj.givenName,
                        //     email: response.profileObj.email,
                        //     picture: response.profileObj.imageUrl,
                        // }
                        // this.props.dispatch(storeInfoForRegister(data));
                        this.setState({ setSnack: true });
                        this.props.history.push('/register_login');
                    }
                });
        }
        else {
            console.log(response)
            // this.setState({
            //     formError: true
            // })
        }
    }
    responseGoogle = (response) => {
        console.log(response)
    }
    render() {
        let template;
        this.state.authFailed ?
            template = (
                <div>
                </div>
            )
            : template = (
                <div className="login_btn">
                    <GoogleLogin
                        clientId="951803019708-gs8na9tkemvqrkj6pcq6s93vku37gn22.apps.googleusercontent.com"
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='gmail_signin_button' >
                                <img src={require('../../asset/login-page/mail_Icon.png')} />Đăng nhập bằng Gmail
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={this.loginByGooggle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        open={this.state.setSnack}
                        onClose={() => this.setState({ setSnack: false })}
                        autoHideDuration={2000}
                    >
                        <MuiAlert elevation={6} variant="filled" severity={'error'} >Tài khoản chưa được đăng kí</MuiAlert>
                    </Snackbar>
                </div>

            );
        return (
            <>
                {template}
            </>
        );
    }
}

export default connect()(withRouter(GoogleLoginButton));