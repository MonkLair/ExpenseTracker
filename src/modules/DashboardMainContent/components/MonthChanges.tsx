
interface MonthChangesProps {
    changeType: 'Expense' | 'Income',
    period: 'This' | 'Last'
}

export default function MonthChanges({ changeType, period }: MonthChangesProps) {
    return (
        <>
            <div className="month-changes-block">
                <div className="month-changes-item">
                    <span>{`${changeType} ${period} Month`}</span>
                </div>
                <div className="month-changes-item">
                    <span>value and type</span>
                </div>
            </div>
        </>
    )
}
