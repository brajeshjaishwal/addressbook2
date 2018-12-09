import React, { Component } from 'react'
import { List, Card, Grid, Button} from 'semantic-ui-react';

class GroupComponent extends Component {
    
    render() {
        return (
            <List.Item key={this.props.group} >
                <Card fluid>
                    <Card.Content>
                        <Grid columns={2} >
                            <Grid.Row>
                                <Grid.Column width='13'>
                                    <div>{this.props.group}</div>
                                </Grid.Column>
                                <Grid.Column width='3' >
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

export default GroupComponent