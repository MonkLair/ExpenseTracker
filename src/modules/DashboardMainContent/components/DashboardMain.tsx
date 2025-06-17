import DashboardFooter from "../../../components/DashboardFooter/DashboardFooter";
import MonthChanges from "./MonthChanges";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseCard from "./ExpenseCard";

export function DashboardMain() {
    return (
        <>
            <div className='dashboard-main-block'>
                <div className="main-block-content">
                    <div className="main-block-item">
                        <MonthChanges period="Last" changeType="Expense" />
                        <MonthChanges period="This" changeType="Expense" />
                        <MonthChanges period="Last" changeType="Income" />
                        <MonthChanges period="This" changeType="Income" />
                    </div>
                    <div className="main-block-item">
                        <AddExpenseForm />
                        <ExpenseCard />
                        <ExpenseCard />
                    </div>

                </div>
                <DashboardFooter />
            </div>

        </>
    )
}
