import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Card, Grid, Button, Label } from 'semantic-ui-react';
import { deleteGroupAction, fetchCachedGroupItemsAction } from '../../actions/group';
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
    onSelect = async event => {
        event.preventDefault()
        await this.props.fetchGroup({groupid: event.target.name})
    }
    render() {
        let { id, name, active, total } = this.props.group
        let selectedGroup = this.props.selectedGroup ? this.props.selectedGroup.name : 'All Contacts'
        let editable = name !== 'All Contacts'
        return (
            <List.Item key={id} >
                <Card fluid color={selectedGroup === name ? 'red' : 'grey'} >
                    <Card.Content>
                        <Grid columns={2}>
                            <Grid.Row >
                                <Grid.Column width='11'>
                                    <div >
                                        <Link name={id} to={`/dashboard/${id}`} onClick={this.onSelect}>{name}</Link>
                                        <Label circular style={{marginLeft:'1em'}} >{total}</Label>
                                        {//don't show it when all contacts are selected
                                        editable && 
                                        <Label circular empty style={{marginLeft:'0.5em'}} color={ active ? 'green' : 'grey' } />
                                        }
                                    </div>
                                </Grid.Column>
                                <Grid.Column width='5' >
                                {   editable && 
                                    <div>
                                        <Button icon='pencil' size='tiny' circular
                                            onClick={this.onEdit}/>
                                        <Button icon='delete' size='tiny' circular color='yellow' 
                                            loading = {this.props.loading === id}
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

function mapStateToProps(state) {
    return {
        loading: state.group.loading,
        error: state.group.error,
        selectedGroup: state.group.selectedGroup
    }
}
function mapDispatchToProps(dispatch) {
    return {
        removeGroup: bindActionCreators(deleteGroupAction, dispatch),
        fetchGroup: bindActionCreators(fetchCachedGroupItemsAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupComponent)