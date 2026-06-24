import { toCorrectFormat } from "../helpers/toCorrectFormat"

interface ExpenseCardProps{
    spentOn: string,
    amount: string,
    category: string,
    date: string,
    currency: string
}

export default function ValueExpenseCard({spentOn, amount, category, date, currency}: ExpenseCardProps) {
    return (
        <div className="value-expense-card-item">
            <div className="expense-info-item info-purpose">
                <span>{spentOn}</span>
                <span>{amount + ' ' + currency}</span>
            </div>
            <div className="expense-info-item info-category">
                <span>{category}</span>
            </div>
            <div className="expense-info-item info-date">
                <span>{toCorrectFormat(date)}</span>
            </div>
        </div>
    )
}
