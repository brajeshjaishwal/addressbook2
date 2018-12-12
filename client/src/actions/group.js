import constants from '../constants/group'
import { proxy, handleError, getConfig } from '../api/api'

const { AddGroup, AddGroup_Success, AddGroup_Failure,
        FetchCachedGroup, FetchCachedGroupNames, FetchCachedGroupItems,
        FetchGroupList, FetchGroupList_Success, FetchGroupList_Failure,
        RemoveGroup, RemoveGroup_Success, RemoveGroup_Failure,
        EditGroup, EditGroup_Success, EditGroup_Failure } = constants

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
    function addGroupStarted() { return { type: AddGroup, payload: {error: '', success: false, loading: 'addgroup'} } }
    function addGroupSucceded(group) { return { type: AddGroup_Success, payload: { group, loading: '', success: true } } }
    function addGroupFailed(error) { return { type: AddGroup_Failure, payload: { error, loading: ''} }}
}

export const deleteGroupAction = function ({ groupid }) {
    const config = getConfig();
    const request = proxy.delete(`contacts/group/${groupid}`, config)
    return async (dispatch) => {
        dispatch(deleteGroupStarted(groupid))
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
    function deleteGroupStarted(groupid) { return { type: RemoveGroup, payload: {error: '', success: false, loading: groupid} } }
    function deleteGroupSucceded(group) { return { type: RemoveGroup_Success, payload: { group, loading: '', success: true } } }
    function deleteGroupFailed(error) { return { type: RemoveGroup_Failure, payload: { error, loading: ''} }}
}

export const editGroupAction = function ({groupid, name, active}) {
    const config = getConfig();
    const request = proxy.put(`contacts/group/${groupid}`, { name, active }, config)
    return async (dispatch) => {
        dispatch(editGroupStarted())
        try{
            let resp = await request
            let { group, message } = await resp.data
            console.log('edit group action', group)
            if(group === null) {
                dispatch(editGroupFailed(message))    
            } else {
                dispatch(editGroupSucceded(group))
            }
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(editGroupFailed(errorMessage))
        }
    }
    function editGroupStarted() { return { type: EditGroup, payload: {error: '', success: false, loading: true} } }
    function editGroupSucceded(group) { return { type: EditGroup_Success, payload: { group, loading: false, success: true } } }
    function editGroupFailed(error) { return { type: EditGroup_Failure, payload: { error, loading: false} }}
}

export const fetchAllGroupsAction = function () {
    var config = getConfig();
    const request = proxy.get(`contacts/group/list`, config)
    return async (dispatch) => {
        dispatch(fetchGroupsStarted())
        try{
            let resp = await request
            let result = await resp.data
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
    function fetchGroupsStarted() { return { type: FetchGroupList, payload: { loading: true, error: '' } } }
    function fetchGroupsSucceded(groups) { return { type: FetchGroupList_Success, payload: { groups, loading: false } } }
    function fetchGroupsFailed(error) { return { type: FetchGroupList_Failure, payload: { error, loading: false}}}
}

export const fetchCachedGroupAction = function ({groupid}) {
    return {
        type: FetchCachedGroup,
        payload: { groupid }
    }
}

export const fetchCachedGroupItemsAction = function ({groupid}) {
    return {
        type: FetchCachedGroupItems,
        payload: { groupid }
    }
}

export const fetchCachedGroupNamesAction = function () {
    return {
        type: FetchCachedGroupNames,
        payload: { }
    }
}