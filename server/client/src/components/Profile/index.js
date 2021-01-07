import React, { Component } from 'react';
import { connect } from 'react-redux';
import { all, get,disableuser } from './../../actions/user_action'
import LinearProgress from '@material-ui/core/LinearProgress';
import { GridDots, LayoutList, Settings, LayoutGrid, Tag, Dots, CircleX, Heart, Message2, Bookmark } from 'tabler-icons-react'
import './profile.scss';
import { Edit, Trash } from 'tabler-icons-react';
import Layout from '../Layout/index';
import Skeleton from '@material-ui/lab/Skeleton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, withRouter, useParams } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert'

import { Button, withTheme, Snackbar, SnackbarMessage, Dialog } from '@material-ui/core';
import { set } from 'mongoose';
class Profile extends Component {
    state = {
        setOpen: false,
        setSnack:false
    }
    handleClickOpen = () => {
        this.setState({setOpen:true});
    };

    handleAccept = () => {
    this.setState({setOpen:false,setSnack:true});
    this.props.dispatch(disableuser(this.props.match.params.id)).then(data=>{this.props.history.push('/Dashboard'); this.setState({setOpen:false,setSnack:true});});
    };
    handleDiscline = ()=>{
        this.setState({setOpen:false});
    }
    componentDidMount() {
        this.props.dispatch(get(this.props.match.params.id)).then((data) => console.log(this.props.user ? this.props.user.userProfile : ''));
    }
    render() {
        const userProfile = this.props.user.userProfile
        return (
            <Layout>
                <div className="shop_container">
                    <div className="shop_wrapper">


                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <div className="lg-col-bg" >
                                    <div className="lg-col-ttl2">{userProfile ? userProfile.userName : <Skeleton variant="rect" width={100} height={36} />}</div>
                                    <div className="lg-col-wrt">
                                        <b>Họ tên : </b>{userProfile ? userProfile.name : <Skeleton variant="rect" width={50} height={30} />} <br></br>
                                        <b>Số điện thoại:</b>  {userProfile ? userProfile.phone : <Skeleton variant="rect" width={50} height={30} />} <br></br>
                                        <b>Email :</b> {userProfile ? userProfile.email : <Skeleton variant="rect" width={50} height={30} />}
                                        <div>
                                            <Button className="follow_options"><Link to={`/userupdate/${this.props.match.params.id}`}>Chỉnh sửa</Link></Button>
                                            <Trash onClick={() => this.setState({ setOpen: true })} size={30} strokeWidth={1} color="red" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-6 col-xs-12">
                                <div className="lg-col-bg2" >
                                    {
                                        userProfile ?
                                            <img className="img-lg-col2" src={userProfile.avt}></img> :
                                            <Skeleton variant="circle" width={160} height={160} />
                                    }

                                    {/* <img src={this.props.user.user}alt="" className="img-lg-col2"/>					    */}
                                </div>
                            </div>

                        </div>
                    </div>
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
export default connect(mapStateToProps)(Profile);