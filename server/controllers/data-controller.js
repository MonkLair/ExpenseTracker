const dataService = require("../services/data-service")

class DataController {
    async update(req, res, next) {
        try {
            const {userId, operation, type} = req.body
            const userData = await dataService.update(userId, operation, type)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changeCurrency(req, res, next) {
        try {
            const {newCurrency, userId} = req.body
            const userData = await dataService.changeCurrency(newCurrency, userId)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DataController()


// const dataObject = {
//     incomes: {
//         lastMonthSummary,
//         thisMonthSummary,
//         operations: [{
//             date,
//             category,
//             spentOn,
//             amount,
//             remarks
//         }]
//     },
//     expenses: {
//         lastMonthSummary,
//         thisMonthSummary,
//         operations: [{
//             date,
//             category,
//             getFrom,
//             amount,
//             remarks
//         }]
//     }
// }