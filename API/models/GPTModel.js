const mongoose = require('mongoose')
const { Schema } = mongoose;

const GTPSchema = mongoose.Schema({
    prompt: String,
    response: String,
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date_created: Date
})
const GTPModel = mongoose.model('GPT', GTPSchema)
module.exports = GTPModel