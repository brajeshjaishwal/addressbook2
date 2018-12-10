import React, {Component} from 'react'
import {Input, Button, Modal, Divider, Message} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { loginUserAction } from '../../actions/auth'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            open: true,
            login: false,
        }
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler = async (event) => {
        console.log(this.state)
        event.preventDefault()
        if(!this.state.email || !this.state.password)
        {
            alert('please enter required values.')
            return
        } 
        let { email, password } = this.state
        await this.props.loginUser({email, password})
        let token = sessionStorage.getItem('token')
        console.log(token)
        if(token && token !== null && token !== undefined && token !== 'undefined') {
            this.setState({open: false})       
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <Modal size='mini' open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>User Information</Modal.Header>
                <Modal.Content>
                    <Input name="email" fluid placeholder='Enter your username' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} label={this.props.domain} labelPosition='right'></Input>
                    <Input name="password" type='password' fluid placeholder='Enter your password'
                        icon='key' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} />
                    { this.props.error && <span style={{color:'red'}}>{this.props.error}</span>}
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
        domain: state.auth.domain,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginUser: bindActionCreators(loginUserAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)