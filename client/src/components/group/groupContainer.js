import React, { Component } from 'react'
import GroupComponent from './group';
import { Grid, List, Segment, Header, Input, Icon, Button } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { addGroupAction, fetchAllGroupsAction } from '../../actions/group'

class GroupContainerComponent extends Component {

    state = {
        newgroup:''
    }
    
    async componentDidMount() {
        await this.props.fetchAllGroups()
    }

    onSearchChange = () => {
        
    }

    onAddGroup = async event => {
        await this.props.addGroup({name: this.state.newgroup})
        if(this.props.error) {
            alert(this.props.error)
        }
        this.setState({newgroup: ''})
    }

    onChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render () {
        let groups = []
        let allcontacts = { id: '00000', name: 'All Contacts', total: 0, active: true }
        groups.push(allcontacts)
        this.props.groups.forEach(g => { 
            g.total = g.contacts.length
            allcontacts.total += g.total
            groups.push(g)
        })

        return (
            <Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column > 
                            <Header color='yellow'>
                                <Icon name='group' />
                                <Header.Content>Groups</Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column align='right'>
                            <Input fluid 
                                name='newgroup'
                                label={<Button icon='add' loading={this.props.loading} compact onClick={this.onAddGroup}/>}
                                labelPosition='right'
                                value={this.state.newgroup}
                                placeholder='Add new group' 
                                onChange={this.onChangeHandler}/>
                        </Grid.Column>
                        <Grid.Column >
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <List >
                    {
                        groups.map(g => 
                            <GroupComponent name={g.name} key={g.name} group={g} {...this.props}/>)
                    }
                </List>
            </Segment>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.group.groups,
        loading: state.group.loading,
        error: state.group.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addGroup: bindActionCreators(addGroupAction, dispatch),
        fetchAllGroups: bindActionCreators(fetchAllGroupsAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainerComponent)