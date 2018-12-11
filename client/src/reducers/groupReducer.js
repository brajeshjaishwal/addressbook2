import globals from '../constants/group'

let initialState = {
    groups: [/* list of groups and underneath contact list*/],
    key:'',
    loading: false,
    error: '',
    errorMessage: '',
    success: false,
}

const groupReducer = (state = initialState, action) => {
    console.log('groupReducer', state)
    switch(action.type) {
        case globals.EditGroup:
        case globals.EditGroup_Failure:
        case globals.EditGroup_Success:
        case globals.RemoveGroup:
        case globals.RemoveGroup_Failure:
        case globals.RemoveGroup_Success:
        case globals.AddGroup:
        case globals.AddGroup_Failure:
        case globals.FetchGroup:
        case globals.FetchGroup_Success:
        case globals.FetchGroup_Failure:
        case globals.FetchGroupList:
        case globals.FetchGroupList_Success:
        case globals.FetchGroupList_Failure:
            return { ...state, ...action.payload}
        case globals.AddGroup_Success:
            return { ...state, groups: [...state.groups, action.payload.group], ...action.payload} 
        default: 
            return { ...state }
    }
}

export default groupReducer