import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './SideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
import { logoutUser } from '../../actions/user_action'

class SideBar extends Component {

    logoutHandler = () => {
        this.props.dispatch(logoutUser())
            .then(response => {
                if (response.payload.success) {
                    this.props.history.push('/register_login')
                }
            })
    }

    render() {
        return (
            <div className="sidebar">
                <div className="logo">
                    <img className="stunning_logo" src={require('../../asset/login-page/logo2x.png')} />
                    <img className="stunning_text" src={require('../../asset/login-page/stun2x.png')} />
                </div>
                <div className="tools">
                    <h5>Công cụ quản lý</h5>
                    <ul>
                        <li className="active" onClick={()=>this.props.history.push("/Dashboard")}>Quản lý người dùng</li>
                    </ul>
                </div>
                    <div className="info">
                        <div className="wrapper">
                            <img className="avt" src={this.props.user.avt} />
                            <p className="name" >{this.props.user.name} </p>
                        </div> 
                        <div className="logout">
                            <FontAwesomeIcon icon={faCog} />
                        <Link key={1} onClick={() => { this.logoutHandler()}}>Log out</Link>
                        </div>            
                    </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
   
    };
}

export default connect( mapStateToProps)(withRouter(SideBar));