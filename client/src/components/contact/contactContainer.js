import React, { Component } from 'react'
import { List, Segment, Header, Grid, Input, Icon, Select, Button, Pagination } from 'semantic-ui-react';
import ContactComponent from './contact';

export default class ContactContainerComponent extends Component {
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
    render() {
        let selectedGroup = this.props.match.params.group || 'All Contacts'
        let contactList = [
                            { 
                                id: '11111',
                                name: 'Brajesh jaishwal',
                                job: 'Senior software developer',
                                email: 'brajesh.jaishwal@gmail.com',
                                phone: '9413844898',
                                active: true,
                            },
                            { 
                                id: '12455',
                                name: 'Shakun jaiswal',
                                job: 'Project leader',
                                email: 'shakun.jaiswal@gmail.com',
                                phone: '7665432898',
                                active: true,
                            },
                            { 
                                id: '112333',
                                name: 'Yesha jaiswal',
                                job: 'Software developer',
                                email: 'yesha.jaiswal@gmail.com',
                                phone: '12345678',
                                active: false,
                            }
                        ]
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
                                <Header.Content>{selectedGroup}</Header.Content>
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
                    <List selection>
                        {
                            contactList.map(c => <ContactComponent key={c.email} contact={c} {...this.props}/>)
                        }
                    </List>
                </Segment>
                <Segment>
                    <Pagination
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