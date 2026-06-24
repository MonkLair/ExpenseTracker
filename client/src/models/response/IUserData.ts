export interface expenseOperation {
    date: string,
    expenseCategory: string,
    spentOn: string,
    expenseAmount: number,
    remarks: string
}

export interface incomeOperation {
    date: string,
    incomeCategory: string,
    getFrom: string,
    incomeAmount: number,
    remarks: string
}


interface Expenses {
    lastMonthSummary: number,
    thisMonthSummary: number,
    operations: expenseOperation[]
}

interface Incomes {
    lastMonthSummary: number,
    thisMonthSummary: number,
    operations: incomeOperation[]
}

export interface IUserData {
    user: string,
    data: [{
        incomes: Incomes,
        expenses: Expenses
    }],
    currency: string
}