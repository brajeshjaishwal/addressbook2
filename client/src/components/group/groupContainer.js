import React, { Component } from 'react'
import GroupComponent from './group';
import { Grid, List, Segment, Header, Input, Icon, Button } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { addGroupAction } from '../../actions/group'

class GroupContainerComponent extends Component {

    state = {
        newgroup:''
    }

    onSearchChange = () => {
        
    }

    onAddGroup = async event => {
        await this.props.addGroup({name: this.state.newgroup})
        this.setState({newgroup: ''})
    }

    onChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render () {
        let groupList = [
                            { id:'0000', name: 'All Contacts', active: true, total: 10 }, 
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
                            <Input
                                name='newgroup'
                                label={<Button icon='add' compact onClick={this.onAddGroup}/>}
                                labelPosition='right'
                                value={this.state.newgroup}
                                placeholder='Add new group' 
                                onChange={this.onChangeHandler}/>
                        </Grid.Column>
                        <Grid.Column >
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <List selection>
                    {
                        groupList.map(g => <GroupComponent  name={g.name}
                                                            key={g.id} 
                                                            group={g}
                                                            {...this.props}/>)
                    }
                </List>
            </Segment>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groups
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addGroup: bindActionCreators(addGroupAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainerComponent)