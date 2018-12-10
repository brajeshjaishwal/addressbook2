import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PrivateRoute from './privateroute'
import register from '../user/register';
import login from '../user/login';
import Dashboard from '../dashboard'
import EditGroupComponent from '../group/editGroup'
import EditContactComponent from '../contact/editContact'
import HeaderComponent from '../header'

class App extends Component {
  
  render() {
    return (
          <BrowserRouter>
            <Container>
              <HeaderComponent />
              <Switch>
                <Route exact path="/" component={login}/>
                <Route exact path="/Login" component={login}/>
                <Route exact path="/Register" component={register}/>
                { /* below all will be protected routes*/ }
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/dashboard/:group" component={Dashboard}/>
                <Route exact path="/editgroup/:id" component={EditGroupComponent}/>
                <Route exact path="/addcontact" component={EditContactComponent}/>
                <Route exact path="/editcontact/:id" component={EditContactComponent}/>
                <PrivateRoute path="/dashboard" />
              </Switch>
            </Container>
          </BrowserRouter>
    );
  }
}

export default App;