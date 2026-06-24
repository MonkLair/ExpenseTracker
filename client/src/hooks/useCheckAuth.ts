import { useEffect } from "react"
import { useNavigate } from "react-router"
import { checkAuth } from "../store/reducers/authSlice"
import { useAppDispatch } from "./redux"

export function useCheckAuth() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            navigate('/login')
        }
    }, [])
    return true
}
