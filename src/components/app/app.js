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
import { fetchDomainAction } from '../../actions/auth'
import HeaderComponent from '../header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class App extends Component {
  componentDidMount = async () => {
    //console.log('in app loading')
    await this.props.fetchDomain()
  }
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
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/dashboard/:group" component={Dashboard}/>
                <PrivateRoute exact path="/editgroup/:id" component={EditGroupComponent}/>
                <PrivateRoute exact path="/addcontact" component={EditContactComponent}/>
                <PrivateRoute exact path="/editcontact/:id" component={EditContactComponent}/>
              </Switch>
            </Container>
          </BrowserRouter>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDomain: bindActionCreators(fetchDomainAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App);