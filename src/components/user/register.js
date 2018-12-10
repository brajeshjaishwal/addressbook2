import React, {Component} from 'react'
import {Input, Button, Modal, Message, Divider} from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { registerUserAction } from '../../actions/auth';
import validator from 'validator'

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
            email: '',
            phone:'',
            password: '',
            open: true,
            passwordError: 'length > 8, special character, number, capital letter',
            emailError: '',
            phoneError: '',
            nameError: '',
        }
    }

    onChangeHandler = (e) => {
        let tempValue = e.target.value
        this.setState({[e.target.name]: tempValue})
        if(e.target.name === 'password') {
            let error = ''
            if(!min8Length.test(tempValue)) {
                error += 'length > 8, '
            }
            if(!oneSpecialLetter.test(tempValue)) {
                error += 'special character, '
            }
            if(!oneNumber.test(tempValue)) {
                error += 'number, '
            }
            if(!oneCapitalLetter.test(tempValue)) {
                error += 'capital letter'
            }
            this.setState({passwordError: error})
        } else if(e.target.name === 'email') {
            let tempEmail = tempValue + this.props.domain
            let error = ''
            if(tempValue && !validator.isEmail(tempEmail)) {
                error = 'Email not valid'
            }
            this.setState({emailError: error})
        } else if(e.target.name === 'phone') {
            let error = ''
            if(tempValue && (!validator.isNumeric(tempValue) || tempValue.length < 10)) {
                error = 'phone number not valid'
            }
            this.setState({phoneError: error})
        } 
    }

    onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(this.state.name)
        if( this.state.emailError || this.state.passwordError || this.state.phoneError ||
            !this.state.name || !this.state.password || !this.state.phone || !this.state.email)
        {
            alert('please correct all entries.')
            return
        }
        this.setState({open: false})
        let {name, email, phone, password} = this.state
        await this.props.registerUser({name, email, phone, password,})
    }

    render() {
        let registered = this.props.registered || false
        return (
            <Modal size='mini' open={this.state.open} closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header>User Information</Modal.Header>
                <Modal.Content>
                    <Input name="name" fluid placeholder='Enter name' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='user' ></Input>

                    <Input name="email" fluid placeholder='Enter email' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} label = {this.props.domain} labelPosition='right'></Input>
                    { this.state.emailError && <span style={{color:'red'}}>{this.state.emailError}</span>}

                    <Input name="phone" fluid placeholder='Enter phone number' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='phone' ></Input>
                    { this.state.phoneError && <span style={{color:'red'}}>{this.state.phoneError}</span>}

                    <Input name="password" type='password' fluid placeholder='Enter password'
                        icon='key' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} />
                    { this.state.passwordError && <span style={{color:'red'}}>{this.state.passwordError}</span>}

                    { this.props.error && <span style={{color:'red'}}>{this.props.error}</span>}
                    { registered && <span style={{color:'green'}}>Now you are registered, please <a href='/login'>login</a> to proceed.</span>}
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

function mapStateToProps(state) {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        domain: state.auth.domain,
        registered: state.auth.registered,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        registerUser: bindActionCreators(registerUserAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)