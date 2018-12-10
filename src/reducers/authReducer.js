import globals from '../constants/auth'

let initialState = {
    domain: '',
    user: '',
    token: '',
    loading: false,
    error: '',
    errorMessage: ''
}

const authReducer = (state = initialState, action) => {
    console.log('authreducer', state)
    switch(action.type) {
        case globals.LOGIN:
        case globals.LOGIN_FAILED:
        case globals.LOGIN_SUCCEDED:
        case globals.REGISTER:
        case globals.REGISTER_FAILED:
        case globals.REGISTER_SUCCEDED:
        case globals.FETCHDOMAIN:
        case globals.FETCHDOMAIN_SUCCEDED:
        case globals.FETCHDOMAIN_FAILED:
            return { ...state, ...action.payload }
        default:
            return { ...state}
    }
}

export default authReducer