import React, { Component } from 'react'
import { List, Segment, Header, Grid, Input, Icon, Select, Button, Pagination } from 'semantic-ui-react';
import ContactComponent from './contact';

export default class ContactContainerComponent extends Component {
    state = {
        activePage: 1
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage })
    }

    render() {
        let contactList = [
                            { 
                                name: 'Brajesh jaishwal',
                                email: 'brajesh.jaishwal@gmail.com',
                                phone: '9413844898'
                            },
                            { 
                                name: 'Shakun jaiswal',
                                email: 'shakun.jaiswal@gmail.com',
                                phone: '7665432898'
                            },
                            { 
                                name: 'Yesha jaiswal',
                                email: 'yesha.jaiswal@gmail.com',
                                phone: '12345678'
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
                                <Header color='grey' >
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
                    <List>
                        {
                            contactList.map(c => <ContactComponent key={c.email} contact={c} />)
                        }
                    </List>
                </Segment>
                <Segment>
                    <Pagination
                        activePage={this.state.activePage}
                        onPageChange={this.handlePaginationChange}
                        totalPages={5}
                    />
                </Segment>
            </div>
        )
    }
}