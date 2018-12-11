const { AddGroup, GetGroups, GetContacts, EditGroup, DeleteGroup } = require('../db/index')

const getGroupList = async (req, res) => {
    try {
        const { groupid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let groups = await GetGroups({user: user._id})
        let groupsWithContacts = []
        
        groups.forEach(g => {
            let tempGroup = {
                                id: g._id,
                                name: g.name,
                                active: g.active,
                                contacts: []
                            }
            GetContacts({user: user._id, group: g._id})
                .then(contacts => {
                    tempGroup.contacts.push(contacts)
                })
                .catch(err => 
                    { throw err} 
                )
                groupsWithContacts.push(tempGroup)
        })
        return res.send({ groups : groupsWithContacts })
    } catch (Error) {
        return res.send({ groups : null, message: Error.message})
    }
}

const createGroup = async (req, res) => {
    try {
        const { name } = req.body
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let temp = await AddGroup({user: user._id, name})

        group = { id: temp._id, name: temp.name, contacts: [], active: temp.active }
        return res.send({ group })
    } catch (Error) {
        return res.send({ group: null, message: Error.message})
    }
}

const editGroup = async (req, res) => {
    try {
        const { name, active } = req.body
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let temp = await EditGroup({user: user._id, name})

        group = { id: temp._id, name: temp.name, active: temp.active, contacts: [] }

        //change active state of all the associated contacts
        //todo
        let tempContacts = await GetContacts({user: user._id, group: group.id})

        group.contacts.push(tempContacts)
        return res.send({ group })
    } catch (Error) {
        return res.send({ group: null, message: Error.message})
    }
}

const deleteGroup = async (req, res) => {
    try{
        const { groupid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let temp = await DeleteGroup(groupid)
        //todo delete all associated contacts
        group = { id: temp._id, name }
        return res.send({ group })
    } catch(Error) {
        return res.send({ group: null, message: Error.message})
    }
}

module.exports = { getGroupList, createGroup, deleteGroup }