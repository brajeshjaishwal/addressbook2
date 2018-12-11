import constants from '../constants/group'
import { proxy, handleError } from '../api/api'

const { AddGroup, AddGroup_Success, AddGroup_Failure,
        FetchGroup, FetchGroup_Success, FetchGroup_Failure } = constants

const config = { headers: {
    'auth': sessionStorage.getItem('token')
}}

export const addGroupAction = function ({ name }) {
    const config = { headers: {
        'auth': sessionStorage.getItem('token')
    }}
    const request = proxy.post('contacts/group/add', { name }, config)
    return async (dispatch) => {
        dispatch(addGroupStarted())
        try{
            let resp = await request
            let { group, message } = await resp.data
            if(group === null) {
                dispatch(addGroupFailed(message))    
            } else {
                dispatch(addGroupSucceded(group))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(addGroupFailed(errorMessage))
        }
    }
    function addGroupStarted() { return { type: AddGroup, payload: {error: '', success: false, loading: true} } }
    function addGroupSucceded(group) { return { type: AddGroup_Success, payload: { group, loading: false, success: true } } }
    function addGroupFailed(error) { return { type: AddGroup_Failure, payload: { error, loading: false} }}
}

export const fetchGroupsAction = function (parent) {
    var config = { headers: {
        'auth': sessionStorage.getItem('token'),
    }}
    const request = proxy.get(`contacts/group/list`, config)
    return async (dispatch) => {
        dispatch(fetchGroupsStarted(parent))
        try{
            let resp = await request
            let result = await resp.data
            if(result.members === null) {
                dispatch(fetchGroupsFailed(result.message))    
            } else {
                var members = []
                result.members.forEach(m => {
                    members.push({ key: m._id || m.id, parent: m.parent || -1, name: m.name, relation: m.relation })
                })
                dispatch(fetchGroupsSucceded(members))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(fetchGroupsFailed(errorMessage))
        }
    }
    function fetchGroupsStarted(key) { return { type: FetchGroup, payload: { key, loading: key, error: '' } } }
    function fetchGroupsSucceded(groups) { return { type: FetchGroup_Success, payload: { groups, loading: '' } } }
    function fetchGroupsFailed(error) { return { type: FetchGroup_Failure, payload: { error, loading: ''}}}
}