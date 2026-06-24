import { useAppSelector } from "../../../hooks/redux"
import ValueExpenseCard from "./ValueExpenseCard"

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
                <ValueExpenseCard
                    amount = {amount}
                    spentOn = {spentOn}
                    category= {category}
                    date = {date}
                    currency= {currency}
                />
            </div>
        </>
    )
}
