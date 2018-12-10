const express = require('express')
const cors = require('cors')
//const favicon = require('serve-favicon')
const path = require('path')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgon = require('morgan')
const auth = require('./services/auth')
const contact = require('./services/contact')
const { PORT, NODE_ENV, DOMAIN } = require('./config/config').Initialize()

let app = express()

require('./db/index').Connect()

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

app.use(cors())

app.use(helmet())

//app.use(favicon('favicon.ico'));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgon("dev"))

app.use((req, res, next) => auth.authenticate(req, res, next))

if(NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')))

  app.get('/home', (req, res) => {
    const tempPath = path.resolve(__dirname, 'build', 'index.html')
    console.log('index.html path', tempPath)
    res.sendFile(tempPath);
  })
}

//welcome route
app.get('/welcome', (req, res) => auth.welcome(req, res))

//welcome route
app.get('/domain', (req, res) => res.send({domain: DOMAIN}))

//register route
app.post('/users/register', (req, res) => auth.register(req, res))

//login route
app.post('/users/login', async (req, res) => auth.login(req, res))

//update
app.put('/contacts/:contactid', async(req, res) => contact.updateContact(req, res))

//create
app.post('/contacts/add', async(req, res) => contact.createContact(req, res))

//delete
app.delete('/contacts/:contactid', async(req, res) => contact.removeContact(req, res))

//fetch by id
app.get('/contacts/:contactid', async(req, res) => contact.getContact(req, res))

//fetch group list and all contacts
app.get('/contacts/group/list', async(req, res) => contact.getContactList(req, res))

//create group
app.post('/contacts/group/add', async(req, res) => contact.createGroup(req, res))

//fetch all contacts in a group
app.get('/contacts/group/:groupid', async(req, res) => contact.getContactList(req, res))

//edit contact group
app.put('/contacts/group/:groupid', async(req, res) => contact.getContactList(req, res))

//start listening server
app.listen(PORT, () => console.log(`server is running on ${PORT}`))

module.exports = app