import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Card, Grid, Button, Label } from 'semantic-ui-react';
import { deleteGroupAction } from '../../actions/group';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class GroupComponent extends Component {
    onEdit = event => {
        event.preventDefault()
        this.props.history.push(`/editgroup/${this.props.group.id}`)
    }
    onDelete = async event => {
        event.preventDefault()
        await this.props.removeGroup({groupid: this.props.group.id})
    }
    render() {
        let { id, name, active, total } = this.props.group
        let selectedGroup = this.props.match.params.group || 'All Contacts'
        let editable = name !== 'All Contacts'
        return (
            <List.Item key={id} >
                <Card fluid color={selectedGroup === name ? 'red' : 'grey'} >
                    <Card.Content>
                        <Grid columns={2}>
                            <Grid.Row >
                                <Grid.Column width='11'>
                                    <div >
                                        <Link to={`/dashboard/${name}`}>{name}</Link>
                                        <Label circular style={{marginLeft:'1em'}} >{total}</Label>
                                        {   editable && 
                                        <Label circular style={{marginLeft:'1em'}}>
                                            { active ? 'Active' : 'Inactive' }
                                        </Label>
                                        }
                                    </div>
                                </Grid.Column>
                                <Grid.Column width='5' >
                                {   editable && 
                                    <div>
                                        <Button icon='pencil' size='tiny' circular
                                            onClick={this.onEdit}/>
                                        <Button icon='delete' size='tiny' circular color='yellow' 
                                            onClick={this.onDelete} />
                                    </div>
                                }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </List.Item>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        removeGroup: bindActionCreators(deleteGroupAction, dispatch)
        //editGroup: bindActionCreators()
    }
}
export default connect(null, mapDispatchToProps)(GroupComponent)