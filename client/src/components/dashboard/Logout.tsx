import { useNavigate } from "react-router"
import { useAppDispatch } from "../../hooks/redux"
import { logout } from "../../store/reducers/authSlice"

export default function Logout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    async function logoutHandler() {
        await dispatch(logout())
        navigate('/')
    }
    return (
        <>
            <br /><br /><br /><br /><br />
            <button onClick={logoutHandler}>Logout</button>
        </>

    )
}
