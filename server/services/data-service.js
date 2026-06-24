const dataModel = require("../models/data-model")

class DataService {
    async createData(userId) {
        const userData = await dataModel.create({
            user: userId,
            data: [{
                incomes: {
                    lastMonthSummary: 0,
                    thisMonthSummary: 0,
                    operations: []
                },
                expenses: {
                    lastMonthSummary: 0,
                    thisMonthSummary: 0,
                    operations: []
                }
            }],
            currency: "RUB"
        })
        return userData
    }
    async getUserData(userId) {
        const userData = await dataModel.findOne({ user: userId })
        return userData
    }
    async update(userId, operation, type) {
        const response = await dataModel.findOne({ user: userId })
        const expenses = response.data[0].expenses
        const incomes = response.data[0].incomes
        if (!operation) {
            throw new Error('Empty operation')
        }
        if (type === 'expense') {
            response.data[0].expenses.operations.push(operation)
            response.markModified('data.0.expenses')
            expenses.thisMonthSummary += operation.expenseAmount
            return await response.save()
        } else if (type === 'income') {
            incomes.operations.push(operation)
            incomes.thisMonthSummary = incomes.operations.reduce((acc, operation) => {
                return acc + operation.amount
            }, incomes.thisMonthSummary)
            return await response.save()
        }
    }

    async changeCurrency(newCurrency, userId) {
        const userData = await dataModel.findOne({ user: userId })
        userData.currency = newCurrency
        await userData.save()
        return userData
    }
}

module.exports = new DataService()