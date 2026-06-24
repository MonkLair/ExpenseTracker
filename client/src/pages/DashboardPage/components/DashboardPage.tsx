import { useCheckAuth } from '../../../hooks/useCheckAuth'
import { DashboardLayout } from '../../../modules/DashboardLayout'

export default function DashboardPage() {
    useCheckAuth()
    return (
        <>
            <DashboardLayout />
        </>
    )
}
