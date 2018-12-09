import React, { Component } from 'react'
import GroupComponent from './group';
import { Grid, List, Segment, Header, Input, Icon, Button } from 'semantic-ui-react';

export default class GroupContainerComponent extends Component {

    state = {
        searchString: '',
    }

    onSearchChange = () => {
        
    }

    render () {
        let groupList = [
                            { id:'0000', name: 'All', active: true, total: 6 }, 
                            { id:'1111', name: 'Friends', active: true, total: 2 }, 
                            { id:'2222', name: 'Project', active: true, total: 5 },
                            { id:'3333', name: 'Work', active: false, total: 3 },
                        ]
    
        return (
            <Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={6}> 
                            <Header color='yellow'>
                                <Icon name='group' />
                                <Header.Content>Groups</Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column >
                            <Input type='text' placeholder='Add new group' >
                                <input />
                                <Button icon='add' size='tiny' type='submit'></Button>
                            </Input>
                        </Grid.Column>
                        <Grid.Column >
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <List animated>
                    {
                        groupList.map(g => <GroupComponent key={g.id} group={g} {...this.props}/>)
                    }
                </List>
            </Segment>
        )
    }
}