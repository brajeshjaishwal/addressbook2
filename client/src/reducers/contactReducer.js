import globals from '../constants/contact'

let initialState = {
    contact: {},
    key:'',
    loading: false,
    error: '',
    errorMessage: '',
    success: false,
}

const contactReducer = (state= initialState, action) => {
    console.log('contactReducer', state)
    switch(action.type) {
        case globals.AddContact:
        case globals.AddContact_Failure:
        case globals.AddContact_Success:
        case globals.EditContact:
        case globals.EditContact_Failure:
        case globals.EditContact_Success:
        case globals.RemoveContact:
        case globals.RemoveContact_Failure:
        case globals.RemoveContact_Success:
        case globals.FetchContact_Success:
        case globals.FetchContact:
        case globals.FetchContact_Failure:
            return { ...state, ...action.payload}            
        default: 
            return { ...state }
    }
}

export default contactReducer