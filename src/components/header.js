import React, {Component} from 'react'
import { Segment, Grid, Header, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class HeaderComponent extends Component {
    
    onAddContact = event => {
        event.preventDefault()
        this.props.history.push('/addcontact')
    }
    onLogout = event => {
        event.preventDefault()
        //logout
    }
    render() {
        return (
                    <Segment inverted color='yellow'>
                        <Grid>
                            <Grid.Column width={12}>
                                <Header className="item" color='orange' textAlign='left'>CONTACT BOOK</Header>
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