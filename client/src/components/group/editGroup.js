import React, {Component} from 'react'
import { Input, Button, Modal, Divider, Checkbox, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchCachedGroupAction, editGroupAction } from '../../actions/group';

class EditGroupComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            group:'',
            active: false,
            open: true,
        }
    }

    async componentDidMount() {
        await this.props.fetchCachedGroup({groupid: this.props.match.params.id})
        this.setState({group: this.props.dirtyGroup.name, active: this.props.dirtyGroup.active})
    }
    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler = async (event) => {
        event.preventDefault()
        this.setState({open: false})
        let options = { 
                        groupid: this.props.dirtyGroup.id, 
                        name: this.state.group }
        if(this.state.active !== this.props.dirtyGroup.active) {
            options.active = this.state.active
        }
        console.log('on edit group', options)
        await this.props.editGroup(options)
        this.props.history.push('/dashboard')
    }

    onExit = event => {
        event.preventDefault()
        this.setState({open: false})
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <Modal size='mini' open={this.state.open} closeOnEscape={true} closeOnDimmerClick={true} >
                <Header color='orange' style={{background:'orange'}}>Group Information</Header>
                <Modal.Content>
                    <Input name="group" fluid placeholder='Enter group' style={{marginTop: '0.5em'}}
                        icon='group' iconPosition='left' 
                        onChange={this.onChangeHandler} 
                        value={ this.state.group }/>
                    <Checkbox name = 'active' toggle style={{marginTop:'1em'}}
                        label={ this.state.active ? 'deactivate' : 'activate'}
                        checked = { this.state.active }
                        onChange={this.onChangeHandler} />
                    { this.props.error && <span style={{color:'red'}}>{this.props.error}</span>}
                    <Divider></Divider>
                    <Button.Group>
                        <Button name='Save' color='orange' 
                            onClick = {this.onSubmitHandler}
                            loading= { this.props.loading } icon='save' content='' circular compact></Button>
                        <Button.Or />
                        <Button name='Cancel' onClick = {this.onExit} icon='cancel' content='' circular compact></Button>
                    </Button.Group>
                </Modal.Content>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        dirtyGroup: state.group.dirtyGroup,
        loading: state.group.loading,
        error: state.group.error
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchCachedGroup: bindActionCreators(fetchCachedGroupAction, dispatch),
        editGroup: bindActionCreators(editGroupAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupComponent)