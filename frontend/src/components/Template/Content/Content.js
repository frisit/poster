import React from 'react';
import Home from './../../Home/Home'
import Index from './../../Index/Index'
import News from '../../News/News';
import Settings from '../../Settings/Settings';
import NewsAdd from '../../NewsAdd/NewsAdd';

import Guest from '../../Rest/Guest/Guest';
import Signup from '../../Rest/Signup/Signup.jsx';
import Login from '../../Rest/Login/Login';
import Good from '../../Rest/Good/Good';
import Logout from '../../Rest/Logout/Logout';

import './Content.css';
import { Route, BrowserRouter } from "react-router-dom";
import SomeForm from '../../SomeForm/SomeForm';
import Authmin from '../../Authmin/Authmin';


const Content = () => {
  return (
    <div className='content'>
      <Route path='/' exact render={() => <Home />} />

      <Route path='/index' render={() => <Index />} />

      <Route path='/news' render={() => <News />} />

      <Route path='/settings' render={() => <Settings />} />

      <Route path='/some-form' render={() => <SomeForm />} />

      <Route path='/authmin' render={() => <Authmin />} />

      <Route path='/news-add' render={() => <NewsAdd />} />



      <Route path='/rest/guest' render={() => <Guest />} />

      <Route path='/rest/signup' render={() => <Signup />} />

      <Route path='/rest/login' render={() => <Login />} />

      <Route path='/rest/good' render={() => <Good />} />

      <Route path='/rest/logout' render={() => <Logout />} />
    </div>
  )
}

export default Content