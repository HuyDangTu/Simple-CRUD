import React, { Component } from 'react';
import './header.scss'

import { Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../../actions/user_action'
import NativeClickListener from '../../ultils/NativeClickListener';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
// import Search from '../../Search';

class Header extends Component {
    
    state = {
        user:[
            {
                name: 'Explore',
                linkTo: '/',
            },
            {
                name:'Direct',
                linkTo: '/users/direct',
            },
            {
                name: 'Notification',
                linkTo: '/users/Notification',
            },
            {
                name: 'avt'
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
            },
        ],
        dropdown: false,
    }

    logoutHandler = () =>{
        this.props.dispatch(logoutUser())
        .then(response => {
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }
    
    // handleDropdown = () => {
    //     console.log(!this.state.dropdown)
    //     this.setState({
    //         dropdown: !this.state.dropdown
    //     })
    // }

    defaultLink = (item,i) =>{
        if(item.name === 'Log out'){
            return(
            <div>
                <Link to={item.linkTo} key={i}
                onClick={this.logoutHandler}>{item.name}</Link>
            </div>)
        } else if (item.name === 'avt') {
            return (
                <div className="menu">
                    {
                    this.props.user.userData.avt ?
                        <img onClick={this.toggleDropdown} className="avt" alt="photo" src={this.props.user.userData.avt} />
                    :"photo"
                    }
                    {
                        this.state.dropdown ?
                        <NativeClickListener onClick={()=>this.setState({dropdown: false})}>
                        <div className="dropdown" onClick={this.handleBodyClick}>
                            <div className="user_navigation">
                                <div>
                                    <FontAwesomeIcon icon={faUser}/>
                                    <Link to={`/user/${this.props.user.userData._id}`}>Profile</Link>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faCog}/>
                                    <Link to={`/user/setting/${this.props.user.userData._id}`}>Setting</Link>
                                </div>
                            </div>
                            <div className="logout">
                                <Link key={i} onClick={this.logoutHandler}>Log out</Link>
                            </div>
                        </div>
                        </NativeClickListener>
                        : null
                    }          
                </div>
            )
        }else if (item.name === 'Explore'){
            return (
                <div>
                    <img src={require('../../../asset/headerIcon/explore_icon2x.png')} />
                </div>)
        } else if (item.name === 'Notification') {
            return (
                <div>
                    <img src={require('../../../asset/headerIcon/notify_icon2x.png')} />
                </div>)
        } else if (item.name === 'Direct') {
            return (
                <div>
                    <img src={require('../../../asset/headerIcon/direct_icon2x.png')} />
                </div>)
        }else{
            return <div>
                <Link to={item.linkTo} key={i}></Link>
            </div>
        }
    }

    toggleDropdown = (syntheticEvent) => {
        console.log('toggle dropdown')
        this.setState(prevState => ({ dropdown: !prevState.dropdown }))
    }

    handleBodyClick = (syntheticEvent) => {
        console.log('body click')
    }

    showLinks = (type) =>{
        let list = [];

        if(this.props.user.userData){
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if (item.name === 'Log in') {
                        list.push(item)
                    } 
                }else{
                    if(item.name !== 'Log in'){
                        list.push(item)
                    }
                }
            })
        }

        return list.map((item,i) => {
            return this.defaultLink(item,i)
        })
    }

    render() {
        return (
            <header className="header">    
                <div className="header__container container-fluid"> 
                    <div className="row no-gutters">
                        <div className="col-xl-4 no-gutters">
                            <div className="header__logo" onClick={()=>{this.props.history.push('/newfeed')}}>
                                <img src={require('../../../asset/logo/logo2x.png')} />
                                <img class="Logo_stunn" src={require('../../../asset/logo/stunn2x.png')} />
                            </div>
                        </div>
                        <div className="col-xl-4 no-gutters">
                            <div className="header__nav-page">
                                {/* <Search /> */}
                            </div>
                        </div>
                        <div className="col-xl-4 no-gutters">
                            <div className="header__nav-user">
                                {this.showLinks(this.state.user)}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(Header));