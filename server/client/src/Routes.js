import React from 'react';
import { Profiler } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/index';
import Newfeed from './components/NewFeed/index';
import RegisterLogin from './components/Register_login/index';
import Register from './components/Register_login/register';
import Profile from './components/Profile/index';
import ProfileSettings from './components/ProfileSettings/index';
import Auth from './hoc/auth';

const Routes = () =>{ 
  return(
    <Switch>   
          <Route path="/" exact component={Home} />
          <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
          <Route path="/register" exact component={Auth(Register, true)} />
          <Route path="/Dashboard" exact component={Auth(Newfeed, true)} />
          <Route path="/users/:id" exact component={Auth(Profile,true)}/>
          <Route path="/userupdate/:id" exact component={Auth(ProfileSettings,true)}></Route>
    </Switch>
  )
}

export default Routes;
