const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const ContactGroupSchema = new Schema({
    name: {
        type: String,
        required: [true,'name is a required field.']
    },
    active: Boolean,                //active/inactive
    category: String,               //category
    photo: String,                  //photo url
    user: Schema.Types.ObjectId //which user this group belongs to
})

module.exports = Mongoose.model('ContactGroup', ContactGroupSchema)