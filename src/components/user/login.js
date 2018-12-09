import React, {Component} from 'react'
import {Input, Button, Modal, Divider, Message} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { loginUserAction, registerUserAction } from '../../actions/auth'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: '',
            open: true,
            registered: false,
            login: false,
            register: false,
        }
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler = async (event) => {
        console.log(this.state)
        event.preventDefault()
        if(!this.state.name || !this.state.password)
        {
            alert('please enter required values.')
            return
        } 
        let elementName = event.target.name;
        this.setState({[elementName]: true})
        if(event.target.name === 'login') {
            await this.props.loginUser({name: this.state.name, password: this.state.password})
        }else {
            await this.props.registerUser({name: this.state.name, password: this.state.password})
        }
        let token = sessionStorage.getItem('token')
        this.setState({[elementName]: false})
        console.log(token)
        if(token && token !== null && token !== undefined && token !== 'undefined') {
            this.setState({open: false})       
            this.props.history.push('/Family')
        }
    }

    render() {
        let registered = this.props.registered || false

        return (
            <Modal size='mini' open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>User Information</Modal.Header>
                <Modal.Content>
                    <Input name="email" fluid placeholder='Enter your username' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='at' iconPosition='left' label='@inmar.com' labelPosition='right'></Input>
                    <Input name="password" type='password' fluid placeholder='Enter your password'
                        icon='key' iconPosition='left' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} />
                    { this.props.error && <span style={{color:'red'}}>{this.props.error}</span>}
                    { registered && <span style={{color:'green'}}>Now you are registered, please login to proceed.</span>}
                    <Divider></Divider>
                    <Button name='login' primary fluid size='small'
                        onClick = {this.onSubmitHandler}
                        loading= { this.props.loading && this.state.login} >Login</Button>
                </Modal.Content>
                <Message>
                    New to us? <a href='/register'>Register</a>
                </Message>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        registered: state.auth.registered,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginUser: bindActionCreators(loginUserAction, dispatch),
        registerUser: bindActionCreators(registerUserAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)