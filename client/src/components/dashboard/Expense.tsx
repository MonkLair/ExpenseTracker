import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import ValueExpenseCard from "../../modules/DashboardMainContent/components/ValueExpenseCard";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Expense() {
    const [searchValue, setSearchValue] = useState('')

    const { currency, data } = useAppSelector(state => state.dataReducer)
    const operations = data[0].expenses.operations
    const lastOperations = structuredClone(data[0].expenses.operations.slice(-12)).reverse()

    const findResult = operations.filter(item => {
        return (item.date.includes(searchValue)
        || item.expenseAmount.toString().includes(searchValue)
        || item.spentOn.includes(searchValue)
        || item.expenseCategory.includes(searchValue))
    }).slice(-12).reverse()
    return (
        <>
            <div className="expense-content-container">
                <div className="expense-header">
                    <div className="header-title expense-title">Expense</div>
                    <div className="header-search">
                        <input
                            placeholder="Find"
                            type="text"
                            className="currencies-search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    </div>
                </div>
                <div className="expense-icon-block">
                    <div className="expense-cards-btn">
                        <FontAwesomeIcon className="to-start-expense-btn" icon={faArrowLeft} />
                    </div>
                    <div className="expense-cards-btn">
                        <FontAwesomeIcon className="to-end-expense-btn" icon={faArrowRight} />
                    </div>
                </div>
                <div className="expense-main-block">
                    {lastOperations
                        ? findResult.map((operation, index) => {
                            return <ValueExpenseCard
                                spentOn={operation.spentOn}
                                amount={operation.expenseAmount.toString()}
                                date={operation.date}
                                category={operation.expenseCategory}
                                currency={currency}
                                withDelete={true}
                                key={index}
                            />
                        })
                        : 'No operations'
                    }
                </div>
            </div>
        </>
    )
}
