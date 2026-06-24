import { useAppSelector } from "../../../hooks/redux"
import { toCorrectFormat } from "../helpers/toCorrectFormat"

interface ExpenseCardProps{
    spentOn: string,
    amount: string,
    category: string,
    date: string
}

export default function ExpenseCard({spentOn, amount, category, date}: ExpenseCardProps) {
    const {currency} = useAppSelector(state => state.dataReducer)
    return (
        <>
            <div className="expense-card-block">
                <div className="expense-card-item">
                    <span className="expense-title">Recent Expenses - </span>
                </div>
                <div className="expense-card-item">
                    <span className="expense-description">Here a few expenses you've made</span>
                </div>
                <div className="expense-card-item">
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
            </div>
        </>
    )
}
