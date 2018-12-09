import React, { Component } from 'react'
import { List, Card, Grid, Button, Label } from 'semantic-ui-react';

class GroupComponent extends Component {
    onEdit = event => {
        event.preventDefault()
        this.props.history.push('/editgroup')
    }
    onDelete = event => {
        event.preventDefault()
    }
    render() {
        let { id, name, active, total } = this.props.group
        return (
            <List.Item key={id} >
                <Card fluid>
                    <Card.Content>
                        <Grid columns={2} >
                            <Grid.Row>
                                <Grid.Column width='11'>
                                    <div>
                                        {name}
                                        <Label circular style={{marginLeft:'1em'}} >{total}</Label>
                                        <Label circular style={{marginLeft:'1em'}}>
                                            { active ? 'Active' : 'Inactive' }
                                        </Label>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width='5' >
                                    <div>
                                        <Button icon='edit' size='tiny' circular 
                                            onClick={this.onEdit}/>
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

export default GroupComponent