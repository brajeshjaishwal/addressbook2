import constants from '../constants/group'
import { proxy, handleError, getConfig } from '../api/api'

const { AddGroup, AddGroup_Success, AddGroup_Failure,
        FetchGroup, FetchGroup_Success, FetchGroup_Failure,
        RemoveGroup, RemoveGroup_Success, RemoveGroup_Failure } = constants

export const addGroupAction = function ({ name }) {
    const config = getConfig();
    const request = proxy.post('contacts/group/add', { name }, config)
    return async (dispatch) => {
        dispatch(addGroupStarted())
        try{
            let resp = await request
            let { group, message } = await resp.data
            console.log('add group action', group)
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

export const deleteGroupAction = function ({ groupid }) {
    const config = getConfig();
    const request = proxy.delete(`contacts/group/${groupid}`, config)
    return async (dispatch) => {
        dispatch(deleteGroupStarted())
        try{
            let resp = await request
            let { group, message } = await resp.data
            console.log('delete group action', group)
            if(group === null) {
                dispatch(deleteGroupFailed(message))    
            } else {
                dispatch(deleteGroupSucceded(group))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(deleteGroupFailed(errorMessage))
        }
    }
    function deleteGroupStarted() { return { type: RemoveGroup, payload: {error: '', success: false, loading: true} } }
    function deleteGroupSucceded(group) { return { type: RemoveGroup_Success, payload: { group, loading: false, success: true } } }
    function deleteGroupFailed(error) { return { type: RemoveGroup_Failure, payload: { error, loading: false} }}
}

export const fetchAllGroupsAction = function () {
    var config = getConfig();
    const request = proxy.get(`contacts/group/list`, config)
    return async (dispatch) => {
        dispatch(fetchGroupsStarted())
        try{
            let resp = await request
            let result = await resp.data
            console.log('fetchAllGroupsAction', result)
            if(result.groups === null) {
                dispatch(fetchGroupsFailed(result.message))    
            } else {
                dispatch(fetchGroupsSucceded(result.groups))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(fetchGroupsFailed(errorMessage))
        }
    }
    function fetchGroupsStarted() { return { type: FetchGroup, payload: { loading: true, error: '' } } }
    function fetchGroupsSucceded(groups) { return { type: FetchGroup_Success, payload: { groups, loading: false } } }
    function fetchGroupsFailed(error) { return { type: FetchGroup_Failure, payload: { error, loading: false}}}
}