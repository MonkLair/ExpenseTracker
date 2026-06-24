import { useNavigate } from "react-router"
import { useAppDispatch } from "../../hooks/redux"
import { logout } from "../../store/reducers/authSlice"
import { dataSlice } from "../../store/reducers/dataSlice"
import MyButton from "../EntryButton/MyButton"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

export default function Logout() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { clear } = dataSlice.actions
    async function logoutHandler() {
        await dispatch(logout())
        dispatch(clear())
        navigate('/')
    }
    return (
        <>
            <div className="logout-content-container">
                <div className="logout-button">
                <MyButton
                    buttonText="Logout"
                    buttonType="button"
                    iconName={faRightFromBracket}
                    onClick={logoutHandler}
                />
                </div>
            </div>

        </>

    )
}
