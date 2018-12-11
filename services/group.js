const { AddGroup, GetGroups, GetContacts } = require('../db/index')

const getGroupList = async (req, res) => {
    try {
        const { groupid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let groups = await GetGroups({user: user._id})
        let ret = []
        for(let g of groups) {
            let tempGroup = {
                id: g._id,
                name: g.name,
                contacts: []
            }
            let contacts = GetContacts({user: user._id, group: g._id})
            tempGroup.contacts.push(contacts)
            ret.push(tempGroup)
        }
        let contacts = await GetContacts({user: user._id, group: groupid})
        return res.send({ contacts })
    } catch (Error) {
        return res.send({contacts: null, message: Error.message})
    }
}

const createGroup = async (req, res) => {
    try {
        const { name } = req.body
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let group = await AddGroup({user: user._id, name})
        return res.send({ group })
    } catch (Error) {
        return res.send({ group: null, message: Error.message})
    }
}


module.exports = { getGroupList, createGroup }