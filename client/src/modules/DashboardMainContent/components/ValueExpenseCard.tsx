import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { toCorrectFormat } from "../helpers/toCorrectFormat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ExpenseCardProps {
    spentOn: string,
    amount: string,
    category: string,
    date: string,
    currency: string,
    withDelete: boolean
}

export default function ValueExpenseCard({ spentOn, amount, category, date, currency, withDelete }: ExpenseCardProps) {
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
                {
                    withDelete &&
                    <button onClick={() => { }} className="expense-delete-button" type="button">
                        <FontAwesomeIcon icon={faTrashCan} className='delete-button-icon' />
                        <span className="my-button-text">Delete</span>
                        <span></span>
                    </button>}
            </div>

        </div>
    )
}
