import React, { Component } from 'react'
import { List, Segment, Header, Grid, Input, Icon, Select, Button, Pagination } from 'semantic-ui-react';
import ContactComponent from './contact';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { fetchCachedGroupItemsAction } from '../../actions/group'

class ContactContainerComponent extends Component {
    state = {
        activePage: 1,
        totalPages: 5,
        searchString: '',
        searchBy: 'name',
        sortBy: 'name'
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage })
    }

    onSearch = () => {

    }

    onSort = () => {

    }

    onChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    async componentDidMount() {
        let selectedGroup = this.props.match.params.group || '00000'
        await this.props.fetchAllGroups({groupid: selectedGroup})
    }
    render() {
        let selectedGroup = this.props.selectedGroup// this.props.match.params.group || 'All Contacts'
        let contactList = null
        let groupname = ''
        if(selectedGroup) {
            contactList = selectedGroup.contacts
            groupname = selectedGroup.name
        }
        const options = [
                            { key: 'name', text: 'name', value: 'name' },
                            { key: 'email', text: 'email', value: 'email' },
                            { key: 'phone', text: 'phone', value: 'phone' },
        ]
        const pageSizeOptions = [
            { key: '10', text: '10', value: '10' },
            { key: '15', text: '15', value: '15' },
            { key: '20', text: '20', value: '20' },
        ]
        return (
            <div>
                <Segment>
                    <Grid columns={3}>
                        <Grid.Column width={4}>
                            <Header color='yellow' >
                                <Icon name='address card' />
                                <Header.Content>{groupname}</Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input type='text' placeholder='Search contact ...'>
                                <input />
                                <Select compact options={options} defaultValue='name' />
                                <Button icon='search' compact />
                            </Input>
                        </Grid.Column>
                        <Grid.Column width={3} align='right'>
                            <Input >
                                <Select compact options={options} defaultValue='name' />
                                <Button compact icon='sort'/>
                            </Input>
                        </Grid.Column>
                    </Grid>
                    {    contactList && 
                        <List selection> 
                            { 
                                contactList.map(c => <ContactComponent key={c.email} contact={c} {...this.props}/>)
                            }
                        </List>
                    }
                    
                </Segment>
                <Segment>
                    <Pagination pointing secondary
                        activePage={this.state.activePage}
                        onPageChange={this.handlePaginationChange}
                        totalPages={this.state.totalPages}
                    />
                    <Input>
                        <Select name='pagesize' compact
                            style={{marginLeft:'1em'}} 
                            options={pageSizeOptions} 
                            defaultValue='10' />
                        <Button disabled>Page Size</Button>
                    </Input>
                </Segment>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedGroup: state.group.selectedGroup,
        error: state.group.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllGroups: bindActionCreators(fetchCachedGroupItemsAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainerComponent)