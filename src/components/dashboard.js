import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import GroupContainerComponent from './group/groupContainer';
import ContactContainerComponent from './contact/contactContainer';

class Dashboard extends Component {
    render() {
        return (
            <Grid columns={2} divided>
                <Grid.Row stretched>
                    <Grid.Column >
                        <GroupContainerComponent/>
                    </Grid.Column>
                    <Grid.Column >
                        <ContactContainerComponent/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Dashboard
