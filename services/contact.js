const { GetContact, GetContacts, AddContact, EditContact, DeleteContact } = require('../db/index')

const createContact = async (req, res) => {
    try{
        let { name, email, phone, group, starred } = req.body
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let contact = await AddContact({ user: user._id, name, email, phone, group, starred })
        return res.send({ contact })
    }catch(Error){
        return res.send({ contact: null, message: Error.message})
    }
}

const updateContact = async (req, res) => {
    try{
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let contact = await EditContact(req)
        return res.send({ contact })
    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}

const removeContact = async (req, res) => {
    try{
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let contact = await DeleteContact({ id: req.params.contactid })
        return res.send({ contact })
    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}

const getContact = async (req, res) => {
    try{
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let contact = await GetContact({ id: req.params.contactid})
        return res.send({ contact })
    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}
const getContactList = async (req, res) => {
    try {
        const { groupid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let contacts = await GetContacts({user: user._id, group: groupid})
        return res.send({ contacts })
    } catch (Error) {
        return res.send({contacts: null, message: Error.message})
    }
}

module.exports = { createContact, getContactList, updateContact, removeContact, getContact }