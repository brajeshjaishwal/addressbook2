import React, {Component} from 'react'
import {Input, Button, Modal, Divider, Checkbox, Header} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { registerUserAction } from '../../actions/auth';

class EditGroupComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            group: this.props.group | '',
            active: this.props.active | false,
            open: true,
        }
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler = async (event) => {
        event.preventDefault()
        this.setState({open: false})
        await this.props.registerUser({name: this.state.name, password: this.state.password})
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
                        onChange={this.onChangeHandler} icon='group' iconPosition='left' />
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

function mapDispatchToProps(dispatch) {
    return {
        registerUser: bindActionCreators(registerUserAction, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(EditGroupComponent)