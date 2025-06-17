const {Schema, model}  = require('mongoose')


const ExpenseSchema = new Schema({
    expenseType: {type: String, required: true},
    value: {type: Number, required: true},
    date: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
})

module.exports = model('Expense', ExpenseSchema)