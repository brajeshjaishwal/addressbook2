import React, {Component} from 'react'
import {Input, Button, Modal, Message, Divider} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { registerUserAction } from '../../actions/auth';

//var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const oneCapitalLetter = new RegExp("^(?=.*[A-Z])")
const oneNumber = new RegExp("^(?=.*[0-9])")
const oneSpecialLetter = new RegExp("^(?=.*[!@#$%^&*])")
const min8Length = new RegExp("^(?=.{8,})")


class RegisterComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: '',
            open: true,
            passwordError: 'length > 8, special character, number, capital letter',
        }
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        if(e.target.name === 'password') {
            let error = ''
            if(!min8Length.test(e.target.value)) {
                error += 'length > 8, '
            }
            if(!oneSpecialLetter.test(e.target.value)) {
                error += 'special character, '
            }
            if(!oneNumber.test(e.target.value)) {
                error += 'number, '
            }
            if(!oneCapitalLetter.test(e.target.value)) {
                error += 'capital letter'
            }
            this.setState({passwordError: error})
        }
    }

    onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(this.state.name)
        if(!this.state.name || !this.state.password)
        {
            alert('please enter required values.')
            return
        }
        this.setState({open: false})
        await this.props.registerUser({name: this.state.name, password: this.state.password})
        let token = sessionStorage.getItem('token')
        if(token)
            this.props.history.push('/')
    }

    render() {
        let registered = this.props.registered || false
        return (
            <Modal size='mini' open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>User Information</Modal.Header>
                <Modal.Content>
                    <Input name="name" fluid placeholder='Enter name' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='user' iconPosition='left' ></Input>
                    <Input name="email" fluid placeholder='Enter username' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='at' iconPosition='left' label='@inmar.com' labelPosition='right'></Input>
                    <Input name="phone" fluid placeholder='Enter phone number' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='phone' iconPosition='left' ></Input>
                    <Input name="password" type='password' fluid placeholder='Enter password'
                        icon='key' iconPosition='left' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} />
                    { this.props.error && <span style={{color:'red'}}>{this.props.error}</span>}
                    { this.state.passwordError && <span style={{color:'red'}}>{this.state.passwordError}</span>}
                    { registered && <span style={{color:'green'}}>Now you are registered, please login to proceed.</span>}
                    <Divider></Divider>
                    <Button name='register' primary fluid
                        onClick = {this.onSubmitHandler}
                        loading= { this.props.loading && this.state.register} >Register</Button>
                </Modal.Content>
                <Message>
                    Already a user? <a href='/login'>Login</a>
                </Message>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: bindActionCreators(registerUserAction, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(RegisterComponent)