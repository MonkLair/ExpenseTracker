import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../../../components/EntryButton/MyButton";
import { currentTime, currentTimeInput } from "../consts/CurrtentTime";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { update } from "../../../store/reducers/dataSlice";
import { useState } from "react";

export default function AddExpenseForm() {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.authReducer)
    const {currency} = useAppSelector(state => state.dataReducer)

    const [remarks, setRemarks] = useState('')
    const [amount, setAmount] = useState('')
    const [spentOn, setSpentOn] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(currentTimeInput)

    async function handleSubmit() {
        if(!amount || !spentOn || !category) {
            return
        }
        await dispatch(update({
            userId: userState.user.id,
            type: 'expense',
            operation: {
                date: date ? date : currentTime,
                expenseAmount: Number(amount),
                expenseCategory: category,
                spentOn,
                remarks
            }
        }))
    }

    return (
        <>
            <div className="expense-form-block">
                <div className="expense-form-item">
                    <h1 className="expense-title">Expense Info</h1>
                </div>
                <div className="expense-form-item">
                    <span className="expense-description">Enter your expense information below</span>
                </div>
                <div className="expense-form-item">
                    <input
                        className="expense-input expense-input-date"
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="expense-form-item">
                    <select className="expense-select" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value={''}>Expense Category</option>
                        <option>Loan</option>
                        <option>Fare</option>
                        <option>HCS</option>
                        <option>Another</option>
                    </select>
                </div>
                <div className="expense-form-item">
                    <input
                        className="expense-input"
                        type="text"
                        name=""
                        id=""
                        placeholder="Spent On"
                        value={spentOn}
                        onChange={(e) => setSpentOn(e.target.value)}
                    />
                </div>
                <div className="expense-form-item">
                    <input
                        className="expense-input"
                        type="text"
                        name=""
                        id=""
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="expense-currency">{currency}</div>
                </div>
                <div className="expense-form-item remarks">
                    <textarea
                        className="expense-remarks"
                        placeholder="Remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                </div>
                <div className="expense-form-item">
                    <div className="expense-button">
                        <MyButton
                            buttonText="Add Expense"
                            iconName={faPlus}
                            buttonType="button"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
