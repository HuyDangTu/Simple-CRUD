import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../ultils/Form/FormField';
import './register.scss';
import Dialog from '@material-ui/core/Dialog';
import { update, generateData, ifFormValid } from '../ultils/Form/FormActions';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/user_action';
import MyButton from '../ultils/button'
import GoogleLoginButton from '../GoggleLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import Layout from '../Layout/index';
class Register extends Component {
    state = {
        formError: false,
        ErrorMessage: "Dữ liệu không hợp lệ",
        formSuccess: false,
        RegisterWith: false, 
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Tên',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Họ tên'
                },
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false,
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false,
            },
            userName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Tên người dùng',
                    name: 'userName_input',
                    type: 'text',
                    placeholder: 'Tên người dùng'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false,
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Số điện thoại',
                    name: 'phone_input',
                    type: 'phone',
                    placeholder: 'Số điện thoại'
                },
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false,
            },
            password: {
                element: 'input',
                config: {
                    label: 'Mật khẩu',
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Mật khẩu'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false,
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nhập lại mật khẩu',
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Nhập lại mật khẩu'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false,
            }
        },
    }
    // updateFields = (newFormData) => {
    //     this.setState({
    //         formData: newFormData
    //     })   
    // }
    // componentDidMount(){
    //     const formData = this.state.formData;
    //     this.updateFields(formData);
    // }

    updateForm = (element) => {
        console.log(this.state)
        const newFormdata = update(element, this.state.formData, 'register');
        this.setState({
            formError: false,
            formData: newFormdata
        });
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log(this.state.formData);
        let dataToSubmit = generateData(this.state.formData, 'register');
        console.log(dataToSubmit);
        let formIsValid = ifFormValid(this.state.formData, 'register');

        if (formIsValid) {
            console.log(dataToSubmit);
            console.log("OK");
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    console.log(response)
                    if (response.payload.success) {
                        this.setState({
                            formError: false,
                            formSuccess: true,
                            ErrorMessage: response.payload.message
                        });
                        setTimeout(() => {
                            this.props.history.push('/Dashboard')
                        }, 3000);
                    } else {
                        this.setState({ 
                            formError: true, 
                            ErrorMessage: "Vui lòng kiểm tra lại thông tin"
                        });
                    }
                })
        }
        else {
            this.setState({
                formError: true
            })
        }
    }


    render() {
        return (
            <Layout>
            <div className="register">
                <div className="register_page_container">
                    <div className="row no-gutters">
                        <div className="col-xl-12 no-gutters">
                            <div className="right">
                                <div className="register">
                                    <div className='register__container'>
                                    {
                                        this.props.user.RegisterInfo ?
                                        <div>
                                            <form className='register__form' onSubmit={(event) => this.submitForm(event)}>
                                                <div className='avt_wrapper'>
                                                    <img className="avt" src={this.props.user.RegisterInfo.picture} />
                                                </div>
                                                <div className="register__row2">
                                                    <input disabled className="display_input" type="text" value={this.props.user.RegisterInfo.name}/>
                                                    <input disabled className="display_input" type="text" value={this.props.user.RegisterInfo.email}/>                                                   
                                                    <FormField
                                                        id={'userName'}
                                                        formData={this.state.formData.userName}
                                                        change={(element) => this.updateForm(element)}
                                                    />
                                                    <FormField
                                                        id={'password'}
                                                        formData={this.state.formData.password}
                                                        change={(element) => this.updateForm(element)}
                                                    />
                                                    <FormField
                                                        id={'confirmPassword'}
                                                        formData={this.state.formData.confirmPassword}
                                                        change={(element) => this.updateForm(element)}
                                                    />
                                                </div>
                                                {this.state.formError ?
                                                    <div className="errorLabel">
                                                        {this.state.ErrorMessage}
                                                    </div>
                                                        : ''}
                                                    <button className='register__button' onClick={(event) => { this.Register(event) }}>Đăng ký</button>
                                            </form>
                                        </div>
                                        :
                                        <form className='register__form' onSubmit={(event) => this.submitForm(event)}>
                                            <div className='register__logo'>
                                                <img className="logo" src={require('../../asset/login-page/logo2x.png')} />
                                                <img className="stunning_text" src={require('../../asset/login-page/stun2x.png')} />
                                            </div>
                                            {/* <GoogleLoginButton/>
                                            <FacebookLoginButton/> */}
                                            {/* <div className="or_label">
                                                HOẶC
                                            </div> */}
                                            <div className="register__row2">
                                                <FormField
                                                    id={'name'}
                                                    formData={this.state.formData.name}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                <FormField
                                                    id={'email'}
                                                    formData={this.state.formData.email}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                <FormField
                                                    id={'userName'}
                                                    formData={this.state.formData.userName}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                <FormField
                                                    id={'phone'}
                                                    formData={this.state.formData.phone}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                <FormField
                                                    id={'password'}
                                                    formData={this.state.formData.password}
                                                    //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                                                    change={(element) => this.updateForm(element)}
                                                />
                                                <FormField
                                                    id={'confirmPassword'}
                                                    formData={this.state.formData.confirmPassword}
                                                    //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                                                    change={(element) => this.updateForm(element)}
                                                />
                                            </div>
                                            {
                                                this.state.formError ?
                                                    <div className="errorLabel">
                                                            {this.state.ErrorMessage}
                                                    </div>
                                                    : ''
                                            }
                                            <button className='register__button' onClick={(event) => { this.submitForm(event) }}>Thêm mới</button>
                                          
                                        </form>
                                    }    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Layout>);
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps)(withRouter(Register));