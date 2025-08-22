import { currentTime } from "../consts/CurrtentTime";

export default function ExpenseCard() {
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
                        <span>Bus</span>
                        <span>20 BDT.</span>
                    </div>
                    <div className="expense-info-item info-category">
                        <span>Fare</span>
                    </div>
                    <div className="expense-info-item info-date">
                        <span>{currentTime}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
