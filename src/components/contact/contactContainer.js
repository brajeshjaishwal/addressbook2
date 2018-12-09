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
        let contactList = [
                            { 
                                id: '11111',
                                name: 'Brajesh jaishwal',
                                email: 'brajesh.jaishwal@gmail.com',
                                phone: '9413844898',
                                active: true,
                            },
                            { 
                                id: '12455',
                                name: 'Shakun jaiswal',
                                email: 'shakun.jaiswal@gmail.com',
                                phone: '7665432898',
                                active: true,
                            },
                            { 
                                id: '112333',
                                name: 'Yesha jaiswal',
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
        return (
            <div>
                <Segment>
                    <Grid >
                            <Grid.Column width={4}> 
                                <Header color='yellow' >
                                    <Icon name='address card' />
                                    <Header.Content>Contacts</Header.Content>
                                </Header>

                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input type='text' placeholder='Search contact ...'>
                                    <input />
                                    <Select compact options={options} defaultValue='name' />
                                    <Button icon='search'></Button>
                                </Input>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Input type='text' placeholder='Search contact ...' action>
                                    <Select compact options={options} defaultValue='name' />
                                    <Button >Sort</Button>
                                </Input>
                            </Grid.Column>
                    </Grid>            
                    <List animated>
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
                    <Input name='pagesize' placeholder='pagesize' onChange={this.onChangeHandler}/>
                </Segment>
            </div>
        )
    }
}