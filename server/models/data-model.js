const {Schema, model} = require('mongoose')

const DataModel = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    data: {type: [{}]},
    currency: {type: String}
})

module.exports = model('Data', DataModel)