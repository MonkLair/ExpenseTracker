import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../hooks/redux'
import { DashboardLayout } from '../../../modules/DashboardLayout'
import { checkAuth } from '../../../store/reducers/authSlice'

export default function DashboardPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            navigate('/login')
        }
    }, [])
    return (
        <>
            <DashboardLayout />
        </>
    )
}
