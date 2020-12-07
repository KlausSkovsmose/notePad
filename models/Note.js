const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NoteSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = Note = mongoose.model('notes', NoteSchema)