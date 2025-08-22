import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../../../components/EntryButton/MyButton";
import { currentTimeInput } from "../consts/CurrtentTime";

export default function AddExpenseForm() {

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
                    <input className="expense-input expense-input-date" type="datetime-local" value={currentTimeInput}/>
                </div>
                <div className="expense-form-item">
                    <select className="expense-select" id="">
                        <option value="" >Expense Category</option>
                        <option value="">Category 1</option>
                        <option value="">Category 2</option>
                        <option value="">Category 3</option>
                        <option value="">Category 4</option>
                    </select>
                </div>
                <div className="expense-form-item">
                    <input className="expense-input" type="text" name="" id="" placeholder="Spent On" />
                </div>
                <div className="expense-form-item">
                    <input className="expense-input" type="text" name="" id="" placeholder="Amount" />
                    <div className="expense-currency">BDT</div>
                </div>
                <div className="expense-form-item remarks">
                    <textarea className="expense-remarks" placeholder="Remarks" />
                </div>
                <div className="expense-form-item">
                    <div className="expense-button">
                        <MyButton
                            buttonText="Add Expense"
                            iconName={faPlus}
                            buttonType="button"
                            onClick={() => { }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
