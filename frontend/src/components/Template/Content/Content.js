import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './Content.css';

import Index from './../../../screens/Index/Index'
import NewsIndex from '../../../screens/News/Index/NewsIndex';
import NewsAdd from '../../../screens/News/Add/NewsAdd';
import SomeForm from '../../../screens/SomeForm/SomeForm';

import SignUp from '../../../screens/User/SignUp/SignUp';
import Login from '../../../screens/User/Login/Login';
import UserSettings from '../../../screens/User/UserSettings/UserSettings';
import Authorized from '../../../screens/User/Authorized/Authorized';
import Logout from '../../../screens/User/Logout/Logout';


const Content = () => {
  return (
    <div className='content'>
      <Route path='/' render={() => <Index />} />

      <Route path='/some-form' render={() => <SomeForm />} />
      
      <Route path='/news/index' render={() => <NewsIndex />} />

      <Route path='/news/add' render={() => <NewsAdd />} />


      <Route path='/user/user-settings' render={() => <UserSettings />} />

      <Route path='/user/signup' render={() => <SignUp />} />

      <Route path='/user/login' render={() => <Login />} />

      <Route path='/user/authorized' render={() => <Authorized />} />

      <Route path='/user/logout' render={() => <Logout />} />
    </div>
  )
}

export default Content