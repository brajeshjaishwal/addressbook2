import constants from '../constants/contact'
import { proxy, handleError, getConfig } from '../api/api'

const { AddContact, AddContact_Success, AddContact_Failure,
        EditContact, EditContact_Success, EditContact_Failure,
        RemoveContact, RemoveContact_Failure, RemoveContact_Success } = constants

export const addContactAction = function ({ name, phone, email, job, group, active }) {
    const config = getConfig();
    console.log(name, phone, email, job, group, active)
    const request = proxy.post('contacts/add', { name, phone, email, job, group, active }, config)
    return async (dispatch) => {
        dispatch(addContactStarted())
        try{
            let resp = await request
            let { contact, message } = await resp.data
            console.log('addContactAction', contact)
            if(contact === null) {
                dispatch(addContactFailed(message))
            } else {
                dispatch(addContactSucceded(contact))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(addContactFailed(errorMessage))
        }
    }
    function addContactStarted() { return { type: AddContact, payload: {error: '', success: false, loading: true} } }
    function addContactSucceded(contact) { return { type: AddContact_Success, payload: { contact, loading: false, success: true } } }
    function addContactFailed(error) { return { type: AddContact_Failure, payload: { error, loading: false} }}
}

export const editContactAction = function ({ id, name, email, job, active, phone, group }) {
    const config = getConfig();
    const request = proxy.put(`contacts/${id}`, { name, email, job, active, phone, group }, config)
    return async (dispatch) => {
        dispatch(editContactStarted(id))
        try{
            let resp = await request
            let { contact, message } = await resp.data
            console.log('editContactAction', contact)
            if(contact === null) {
                dispatch(editContactFailed(message))
            } else {
                dispatch(editContactSucceded(contact))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(editContactFailed(errorMessage))
        }
    }
    function editContactStarted(id) { return { type: EditContact, payload: {error: '', success: false, loading: id} } }
    function editContactSucceded(contact) { return { type: EditContact_Success, payload: { contact, loading: false, success: true } } }
    function editContactFailed(error) { return { type: EditContact_Failure, payload: { error, loading: false} }}
}

export const removeContactAction = function (id) {
    const config = getConfig();
    const request = proxy.delete(`contacts/${id}`, config)
    return async (dispatch) => {
        dispatch(deleteContactStarted(id))
        try{
            let resp = await request
            let { contact, message } = await resp.data
            console.log('editContactAction', contact)
            if(contact === null) {
                dispatch(deleteContactFailed(message))
            } else {
                dispatch(deleteContactSucceded(contact))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(deleteContactFailed(errorMessage))
        }
    }
    function deleteContactStarted(id) { return { type: RemoveContact, payload: {error: '', success: false, loading: id} } }
    function deleteContactSucceded(contact) { return { type: RemoveContact_Success, payload: { contact, loading: '', success: true } } }
    function deleteContactFailed(error) { return { type: RemoveContact_Failure, payload: { error, loading: ''} }}
}