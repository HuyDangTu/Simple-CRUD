import React, { Component } from 'react';
import { connect } from 'react-redux';
import {all,auth,disableuser} from './../../actions/user_action'
import LinearProgress from '@material-ui/core/LinearProgress';
import './Shop.scss';
import { Edit, Trash} from 'tabler-icons-react';
import Layout from '../Layout/index';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, withRouter, useParams } from 'react-router-dom';
import { Button, withTheme, Snackbar, SnackbarMessage, Dialog } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
class Newfeed extends Component {
    state = {
        limit: 4,
        skip: 0,
        sortBy: { type: "name", order: 1 },
        isloading: false,
        setOpen:false,
        setSnack:false,
        setUser:'',
    }
    componentDidMount(){
        // this.props.dispatch(auth());
        this.props.dispatch(all());
    }
    componentDidUpdate(){
        this.props.dispatch(all());
    }
    handleClickOpen = () => {
        this.setState({setOpen:true});
    };

    handleAccept = () => {
  
    this.props.dispatch(disableuser(this.state.setUser)).then(data=>{ this.props.dispatch(all()); this.setState({setOpen:false,setSnack:true});});
    };
    handleDiscline = ()=>{
        this.setState({setOpen:false});
    }
    render() {
        // const {user} = this.props.user
        // console.log(user)
        return (
            <Layout>
            <div>
                {/* <Layout page="account"> */}
                    <div className="account">
                        <h4>Chào! {this.props.user.userData.name}</h4>
                        <h2>Danh sách user</h2>
                        <div className="button">
                            <button className="add_btn" onClick={() => {this.props.history.push("/register")}}>Thêm mới</button>
                            
                        </div>
                        {
                            this.props.user ? this.props.user.accounts ?
                                <table className="report-list">
                                    <tr className="table-header">
                                        <th className="img"></th>
                                        <th className="name">Tên</th>
                                        <th className="role">Vai trò</th>
                                        <th className="userName" >Username</th>
                                        <th className="email" >Email</th>
                                        <th className="action">Action</th>
                                    </tr>
                                    {
                                        this.props.user.accounts.map((item) => (
                                            <tr className="table-content">
                                                <td><img className="avt" src={item.avt} /></td>
                                                <td className="name" onClick={() => {this.props.history.push(`/users/${item._id}`)}}>
                                                    {item.name}
                                                </td>
                                                <td className="role">Admin</td>
                                                <td className="userName">  {item.userName}</td>
                                                <td className="email">{item.email}</td>
                                                <td className="action">
                                                <div className="action_btn">
                                                <Edit onClick={() => {this.props.history.push(`/userupdate/${item._id}`)}} className="edit" size={24} color="black" strokeWidth={1}/>
                                                <Trash onClick={() => this.setState({ setOpen: true, setUser: item._id })} className="trash" size={24} color="red" strokeWidth={1}/>
                                                </div>
                                                
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </table>
                                : <LinearProgress /> :''
                        }
                     
                    </div>
                {/* </Layout>  */}
                <Dialog className="dialog_wrapper"
                    open={this.state.setOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title"><h6>Bạn có muốn xóa user này không?</h6></DialogTitle>
                    <DialogActions>
                        <Button className="no_btn" onClick={this.handleDiscline}>
                            Disagree
                        </Button>
                        <Button className="yes_btn"  onClick={this.handleAccept}>
                            Agree
                         </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    open={this.state.setSnack}
                    onClose={() => this.setState({ setSnack: false })}
                    autoHideDuration={2000}
                // message=
                >
                    <MuiAlert elevation={6} variant="filled" severity={'warning'} >Đã xóa user</MuiAlert>
                </Snackbar>
            </div>

            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        user: state.user,
    }
}
export default connect(mapStateToProps)(Newfeed);