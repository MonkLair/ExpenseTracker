import { useAppSelector } from "../../../hooks/redux"

interface MonthChangesProps {
    changeType: 'expenses' | 'incomes',
    period: 'this' | 'last'
}

export default function MonthChanges({ changeType, period }: MonthChangesProps) {
    const dataState = useAppSelector(state => state.dataReducer)
    return (
        <>
            <div className="month-changes-block">
                <div className="month-changes-item">
                    <span>{`${changeType[0].toUpperCase() + changeType.slice(1, -1)} ${period[0].toUpperCase() + period.slice(1)} Month`}</span>
                </div>
                <div className="month-changes-item">
                    
                    <span>{dataState.data[0][changeType][`${period}MonthSummary`] + ' ' + dataState.currency}</span>
                </div>
            </div>
        </>
    )
}
