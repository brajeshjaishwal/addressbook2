import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container, Header, Button } from 'semantic-ui-react'
import PrivateRoute from './privateroute'
import register from '../user/register';
import login from '../user/login';
import Dashboard from '../dashboard'
import EditGroupComponent from '../group/editGroup'
import EditContactComponent from '../contact/editContact'

class App extends Component {
  render() {
    return (
          <BrowserRouter>
            <Container>
              <div className='ui four item menu'>
                <Header className="item" color='orange' textAlign='left'>CONTACT BOOK</Header>
                <Button basic primary icon='plus' size='small' circular content='Add Contact' ></Button>
                <Button basic primary icon='lock' size='small' circular content='Logout' ></Button>
              </div>
              <Switch>
                <Route exact path="/" component={login}/>
                <Route exact path="/Login" component={login}/>
                <Route exact path="/Register" component={register}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/editgroup" component={EditGroupComponent}/>
                <Route exact path="/editcontact" component={EditContactComponent}/>
                <PrivateRoute path="/Family" />
              </Switch>
            </Container>
          </BrowserRouter>
    );
  }
}

export default App;