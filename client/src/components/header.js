import React, {Component} from 'react'
import { Segment, Grid, Header, Button, Icon } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class HeaderComponent extends Component {
    
    onAddContact = event => {
        event.preventDefault()
        this.props.history.push('/addcontact')
    }
    onLogout = event => {
        event.preventDefault()
        sessionStorage.clear()
        this.props.history.push('/')
    }
    render() {
        let user = sessionStorage.getItem('name')
        return (
                    <Segment inverted color='yellow'>
                        <Grid>
                            <Grid.Column width={12}>
                                <Header as='h2' color='orange'>
                                    <Icon name='address book' />
                                    <Header.Content>
                                        Contact Manager
                                    <Header.Subheader>{`Hi, ${user}`}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width='4'>
                                <Button icon='plus' compact circular content='Add Contact' 
                                    onClick={this.onAddContact}></Button>
                                <Button icon='lock' compact circular content='Logout' 
                                    onClick={this.onLogout}></Button>
                            </Grid.Column>
                        </Grid>
                    </Segment>
        )
    }
}


export default withRouter(HeaderComponent)