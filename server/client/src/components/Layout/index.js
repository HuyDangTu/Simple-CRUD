import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import './layout.scss';
import { withRouter } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link,useParams } from 'react-router-dom';
import { Button, withTheme, Snackbar, SnackbarMessage, Dialog } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'

class Layout extends Component {
    
    state={
        showDialog: false
    }



    handleClose=()=>{
        this.props.history.push('/register_login'); 
    }
    render() {
        const userData = this.props.user.userData;
    
        return (
            <div className="layout container-fluid ">
                <div className="row no-gutters">
                    <div className="col-xl-3 no-gutters sideBar">
                        <div className="sideBar_wrapper">
                            <SideBar user={userData} page={this.props.page} />
                        </div>
                    </div>
                    <div className="col-xl-9 no-gutters">
                        <div className="page_container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                {
                    this.state.showDialog ?
                    <Dialog className="dialog_wrapper"
                        open={this.state.showDialog}
                        // TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle id="alert-dialog-slide-title"><h6>Hếthạn</h6></DialogTitle>
                        <DialogActions>
                            <Button className="no_btn" onClick={() => { this.props.history.push('/register_login') }}>
                                Oke
                            </Button>
                        </DialogActions>
                    </Dialog>
                    :""
                }
            </div>
           
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(
    mapStateToProps,
)(withRouter(Layout));