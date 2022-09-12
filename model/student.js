
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: String,
    first_name: String,
    email: String,
    age: Number,
    created: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Student', studentSchema)
