import constants from '../constants/contact'
import { proxy, handleError } from '../api/api'

const { AddContact, AddContact_Success, AddContact_Failure } = constants

export const addContactAction = function ({name, email, job, phone}) {
    const config = { headers: {
        'auth': sessionStorage.getItem('token')
    }}
    const request = proxy.post('contacts/add', {name, email, job, phone}, config)
    return async (dispatch) => {
        dispatch(addContactStarted())
        try{
            let resp = await request
            let { contact, message } = await resp.data
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