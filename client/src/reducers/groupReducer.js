import globals from '../constants/group'

let initialState = {
    groups: [/* list of groups and underneath contact list*/],
    selectedGroup: null,
    loading: false,
    error: '',
    errorMessage: '',
    success: false,
}

const groupReducer = (state = initialState, action) => {
    switch(action.type) {
        case globals.EditGroup:
        case globals.EditGroup_Failure:
        case globals.EditGroup_Success:
        case globals.RemoveGroup:
        case globals.RemoveGroup_Failure:
        case globals.AddGroup:
        case globals.AddGroup_Failure:
        case globals.FetchGroupList:
        case globals.FetchGroupList_Failure:
            return { ...state, ...action.payload}
        case globals.AddGroup_Success:
            return { ...state, groups: [...state.groups, action.payload.group], ...action.payload} 
        case globals.RemoveGroup_Success:
            //removed all contacts with the group id
            let filtered = state.groups.filter(group => group.id !== action.payload.group.id)
            return { ...state, groups: filtered, ...action.payload}
        case globals.FetchCachedGroup:
            let dirtyGroup = state.groups.find(g => g.id === action.payload.groupid)
            return { ...state, dirtyGroup }
        case globals.FetchCachedGroupNames:
            return { ...state, groupNames: state.groups }
        case globals.FetchCachedGroupItems:
            let selectedGroup = {
                id: '00000',
                name: 'All Contacts',
                active: true,
                total: 0,
                contacts: []
            }
            if(action.payload.groupid === '00000') {
                //we want all contacts to be displayed
                state.groups.forEach(g => {
                    if(g.total > 0) 
                        selectedGroup.contacts.push(...g.contacts)
                })
            } else {
                //selective group
                selectedGroup = state.groups.find(g => g.id === action.payload.groupid)
            }
            return { ...state, selectedGroup}
        
        case globals.FetchGroupList_Success:
            
            let allGroups = {
                id: '00000',
                name: 'All Contacts',
                active: true,
                total: 0,
                contacts: []
            }
            //we want all contacts to be displayed at initial rendering
            if(action.payload.groups) {
                action.payload.groups.forEach(g => {
                    if(g.total > 0) 
                        allGroups.contacts.push(...g.contacts)
                })
            }
            return { ...state, selectedGroup: allGroups, ...action.payload}
        default: 
            return { ...state }
    }
}

export default groupReducer