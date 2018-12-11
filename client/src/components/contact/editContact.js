import React, {Component} from 'react'
import { Input, Button, Modal, Divider, Checkbox, Header, Select } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { registerUserAction } from '../../actions/auth';
import { fetchCachedGroupNamesAction } from '../../actions/group';

class EditContactComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            contactid: this.props.match.params.id,
            name: this.props.name,
            job: this.props.job,
            phone: this.props.phone,
            email: this.props.email,
            group: this.props.group || '',
            active: this.props.active,
            open: true,
        }
    }

    async componentDidMount() {
        //let contactid = this.props.match.params.id
        //console.log('contact id', contactid)
        if(this.state.contactid) {
            //fetch cached contact detail
        }
    }

    onSelectionChange = ({name, value}) => {
        this.setState({name, value})
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
        let groups = this.props.groups || []
        let options = []
        let defaultGroup = ''
        if(groups.length > 0) {
            groups.forEach(g => {
                options.push({key: g.id, text: g.name, value: g.name})
            })
            if(this.state.contactid) {
                //we are editing existing contact
                defaultGroup = ''
            } else {
                defaultGroup = options[0].text
            }
        }
        console.log('edit contact render', options)
        return (
            <Modal size='mini' open={this.state.open} closeOnEscape={true} closeOnDimmerClick={true}>
                <Header color='orange' style={{background:'orange'}}>Contact Information</Header>
                <Modal.Content>
                    <Input name="name" fluid placeholder='Enter name' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='user' iconPosition='left' />
                    <Input name="email" fluid placeholder='Enter email' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='at' iconPosition='left' 
                        label='@inmar.com' labelPosition='right' />
                    <Input name="phone" fluid placeholder='Enter phone' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='phone' iconPosition='left' />
                    <Input name="job" fluid placeholder='Enter job role' style={{marginTop: '0.5em'}}
                        onChange={this.onChangeHandler} icon='info' iconPosition='left' />
                    <Input fluid style={{marginTop:'0.5em'}} onChange={this.onChangeHandler}>
                        <Select name = 'group' compact fluid options={options} 
                            defaultValue={defaultGroup}                             
                            onChange={event => this.onSelectionChange({name: 'group', value: event.target.textContent })} />
                        <Button disabled>Group</Button>
                    </Input>

                    {   
                        //display active/inactive checkbox when editing existing contact
                        this.state.contactid && 
                        <Checkbox name = 'active' toggle style={{marginTop:'1em'}}
                                label={ this.state.active ? 'deactivate' : 'activate'}
                                checked = { this.state.active }
                                onChange={this.onChangeHandler} />
                    }

                    {//display error information
                        this.props.error && <span style={{color:'red'}}>{this.props.error}</span>
                    }
                    <Divider></Divider>
                    <Button.Group>
                        <Button name='Save' primary 
                            onClick = {this.onSubmitHandler}
                            loading= { this.props.loading } icon='save' content='' circular compact></Button>
                        <Button.Or />
                        <Button name='Cancel' secondary onClick = {this.onExit} icon='cancel' content='' circular compact></Button>
                    </Button.Group>
                </Modal.Content>
            </Modal>
        )
    }
}

function mapStateToPrps(state) {
    console.log('mapstatetoprops in edit contact', state)
    return {
        contact: state.currentContact,
        groups: state.group.groups,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchContact: bindActionCreators(fetchCachedGroupNamesAction, dispatch),
    }
}

export default connect(mapStateToPrps, mapDispatchToProps)(EditContactComponent)