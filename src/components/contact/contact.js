import React, { Component } from 'react'
import { List, Card, Button, Grid, Label } from 'semantic-ui-react';

class ContactComponent extends Component {
    onEdit = event => {
        event.preventDefault()
        console.log(this.props)
        this.props.history.push('/editcontact')
    }
    onDelete = event => {
        event.preventDefault()
    }
    render() {
        let { id, name, email, phone } = this.props.contact
        return (
            <List.Item key={id} >
                <Card fluid>
                    <Card.Content>
                        <Card.Header >
                            {name}
                            <Label circular style={{marginLeft:'1em'}}>Active</Label>
                        </Card.Header>
                        <Grid columns={2} >
                            <Grid.Row>
                                <Grid.Column width='13'>
                                    <div>{email}</div>
                                    <div>{phone}</div>
                                </Grid.Column>
                                <Grid.Column width='3'>
                                    <div>
                                        <Button icon='edit' size='tiny' circular 
                                            onClick={this.onEdit} />
                                        <Button icon='trash' size='tiny' circular color='red'
                                            onClick={this.onDelete} />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </List.Item>
        )
    }
}

export default ContactComponent