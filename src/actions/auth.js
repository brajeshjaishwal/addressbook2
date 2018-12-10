import constants from '../constants/auth'
import { proxy, handleError } from '../api/api'

const { REGISTER, REGISTER_FAILED, REGISTER_SUCCEDED, 
        LOGIN, LOGIN_SUCCEDED, LOGIN_FAILED,
        FETCHDOMAIN, FETCHDOMAIN_SUCCEDED, FETCHDOMAIN_FAILED
        } = constants

export const registerUserAction = function ({name, email, phone, password}) {
    const request = proxy.post('users/register', {name, email, phone, password})
    return async (dispatch) => {
        dispatch(registerStarted())
        try{
            let resp = await request
            let {message} = await resp.data
            if(message !== undefined) {
                dispatch(registerFailed(message))
            }else 
                dispatch(registerSucceded())
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(registerFailed(errorMessage))
        }
    }
    function registerStarted() { return { type: REGISTER , payload: { error: false, loading: true }} }
    function registerSucceded() { return { type: REGISTER_SUCCEDED, payload: { registered: true, loading: false } } }
    function registerFailed(error) { return { type: REGISTER_FAILED, payload: { error, loading: false} } }
}

export const loginUserAction = ({email, password}) => {
    return async (dispatch) => {
        dispatch(loginStarted())
        try{
            let resp = await proxy.post('users/login', {email, password})
            let {user, token, message } = await resp.data
            if(user && user !== '' && user !== undefined)
                sessionStorage.setItem('name', user.name)
            if(token && token !== '' && token !== undefined )
                sessionStorage.setItem('token', token)
            if(user === null || user === undefined || token === undefined) {
                dispatch(loginFailed(message))
            }else 
                dispatch(loginSucceded(user))
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(loginFailed(errorMessage))
        }
    }
    function loginStarted() { return { type: LOGIN, payload: { error: false, loading: true } } }
    function loginSucceded(user) { return { type: LOGIN_SUCCEDED, payload: { user, loading: false } } }
    function loginFailed(error) { return { type: LOGIN_FAILED, payload: {loading: false, error} } }
}

export const fetchDomainAction = () => {
    return async (dispatch) => {
        dispatch(fetchDomainStarted())
        try{
            let resp = await proxy.get('domain')
            let { domain, message } = await resp.data
            if(domain === null || domain === undefined || domain === undefined) {
                dispatch(fetchDomainFailed(message))
            }else {
                sessionStorage.setItem('domain', domain)
                dispatch(fetchDomainSucceded(domain))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(fetchDomainFailed(errorMessage))
        }
    }
    function fetchDomainStarted() { return { type: FETCHDOMAIN, payload: { error: false, loading: true } } }
    function fetchDomainSucceded(domain) { return { type: FETCHDOMAIN_SUCCEDED, payload: { domain, loading: false } } }
    function fetchDomainFailed(error) { return { type: FETCHDOMAIN_FAILED, payload: {loading: false, error} } }
}
