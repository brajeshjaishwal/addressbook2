import React from 'react'
import { List, Segment, Header, Grid, Input, Icon, Select, Button } from 'semantic-ui-react';
import ContactComponent from './contact';

export default function ContactContainerComponent(props) {
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
        <Segment>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column > 
                        <Header color='grey' >
                            <Icon name='address book' />
                            <Header.Content>Contacts</Header.Content>
                        </Header>

                    </Grid.Column>
                    <Grid.Column >
                        <Input type='text' placeholder='Search contact ...' action>
                            <input />
                            <Select compact options={options} defaultValue='name' />
                            <Button icon='search'></Button>
                        </Input>
                    </Grid.Column>
                    <Grid.Column >
                    </Grid.Column>
                </Grid.Row>
            </Grid>            
            <List>
                {
                    contactList.map(c => <ContactComponent key={c.email} contact={c} />)
                }
            </List>
        </Segment>
    )
}