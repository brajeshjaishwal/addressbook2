import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import GroupContainerComponent from './group/groupContainer';
import ContactContainerComponent from './contact/contactContainer';

class Dashboard extends Component {
    render() {
        return (
            <Grid stretched>
                <Grid.Column width={6}>
                    <GroupContainerComponent {...this.props}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <ContactContainerComponent {...this.props}/>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Dashboard
