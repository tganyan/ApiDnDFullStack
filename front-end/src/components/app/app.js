import '@babel/polyfill';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Landing from '../landing/landing'
import AuthRedirect from '../auth-redirect/auth-redirect';


class App extends React.Component {
  render() {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Route path='*' component={AuthRedirect}/>
              <Route exact path='/' component={Landing}/>
              <Route path='/login' component={Landing}/>
              <Route path='/signup' component={Landing}/>
              <Route path='/dashboard' component={Dashboard}/>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
