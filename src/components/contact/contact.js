import React, { Component } from 'react'
import { List, Card, Button, Grid, Label } from 'semantic-ui-react';

class ContactComponent extends Component {
    
    render() {
        return (
            <List.Item key={this.props.contact} >
                <Card fluid>
                    <Card.Content>
                        <Card.Header >
                            {this.props.contact.name}
                            <Label circular style={{marginLeft:'1em'}}>Active</Label>
                        </Card.Header>
                        <Grid columns={2} >
                            <Grid.Row>
                                <Grid.Column width='13'>
                                    <div>{this.props.contact.email}</div>
                                    <div>{this.props.contact.phone}</div>
                                </Grid.Column>
                                <Grid.Column width='3'>
                                    <div>
                                        <Button icon='edit' size='tiny' circular ></Button>
                                        <Button icon='trash' size='tiny' circular color='red'></Button>
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