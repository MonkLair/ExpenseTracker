import DashboardFooter from "../../../components/DashboardFooter/DashboardFooter";
import MonthChanges from "./MonthChanges";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseCard from "./ExpenseCard";
import { useAppSelector } from "../../../hooks/redux";

export function DashboardMain() {
    const expenses = useAppSelector(state => state.dataReducer).data[0].expenses
    const operations = expenses.operations.length > 4 ? expenses.operations.slice(-4) : expenses.operations
    return (
        <>
            <div className='dashboard-main-block'>
                <div className="main-block-content">
                    <div className="main-block-item">
                        <MonthChanges period="last" changeType="expenses" />
                        <MonthChanges period="this" changeType="expenses" />
                        <MonthChanges period="last" changeType="incomes" />
                        <MonthChanges period="this" changeType="incomes" />
                    </div>
                    <div className="main-block-item">
                        <AddExpenseForm />
                        <div className="main-block-expense-card">
                            {operations
                                ? operations.map((operation, index) => {
                                    return <ExpenseCard
                                        spentOn={operation.spentOn}
                                        amount={operation.expenseAmount.toString()}
                                        date={operation.date}
                                        category={operation.expenseCategory}
                                        key={index}
                                    />
                                })
                                : 'No operations'
                            }
                        </div>
                    </div>

                </div>
                <DashboardFooter />
            </div>

        </>
    )
}
