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
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Note = mongoose.model('notes', NoteSchema)