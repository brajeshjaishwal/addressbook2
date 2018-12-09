import React from 'react'
import GroupComponent from './group';
import { Grid, List, Segment, Header, Input, Icon, Button } from 'semantic-ui-react';

export default function GroupContainerComponent(props) {
    let groupList = ['friends', 'Project', 'Work']
    return (
        <Segment>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column > 
                        <Header color='grey'>
                            <Icon name='group' />
                            <Header.Content>Groups</Header.Content>
                        </Header>
                    </Grid.Column>
                    <Grid.Column >
                        <Input type='text' placeholder='Add new group' >
                            <input />
                            <Button icon='add' size='tiny'></Button>
                        </Input>
                    </Grid.Column>
                    <Grid.Column >
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <List>
                <GroupComponent group='all'/>
                {
                    groupList.map(g => <GroupComponent key={g} group={g} />)
                }
            </List>
        </Segment>
    )
}