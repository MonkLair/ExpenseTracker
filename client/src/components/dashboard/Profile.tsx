import { faKey, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import MyButton from "../EntryButton/MyButton"
import { useState } from "react"
import { updatePassword } from "../../store/reducers/authSlice"
import ChangeNameEmailModal from "../modals/ChangeNameEmailModal"

export default function Profile() {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.authReducer)
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    function handleEdit() {
        setIsModalOpen(true)
    }

    function handleUpdate() {
        if (!oldPass || newPass != confirmPass) {
            alert('Неверно!')
            return
        }
        dispatch(updatePassword({ password: oldPass, newPassword: newPass, email: user.email }))
        setOldPass('')
        setNewPass('')
        setConfirmPass('')
        alert('Пароль успешно сменен!')
    }

    return (
        <div className="profile-content-container">
            <div className="profile-item">
                <div className="profile-title">Profile Info</div>
                <div className="profile-description">Detail of your current account information</div>
                <div className="profile-info-container">
                    <div className="profile-name-item">Name</div>
                    <div className="profile-name-item profile-name">{user.name}</div>
                </div>
                <div className="profile-info-container">
                    <div className="profile-email-item">Email</div>
                    <div className="profile-email-item profile-email">{user.email}</div>
                </div>
                <div className="profile-button">
                    <MyButton
                        buttonType="button"
                        buttonText="Edit"
                        iconName={faPenToSquare}
                        onClick={handleEdit}
                    />
                </div>
            </div>
            <div className="profile-item">
                <div className="profile-title">Password Info</div>
                <div className="profile-description">Manage your current password</div>
                <div className="profile-inputs">
                    <input
                        type="password"
                        value={oldPass}
                        className="profile-input"
                        onChange={(e) => setOldPass(e.target.value)}
                        placeholder="Old Password"
                    />
                    <input
                        type="password"
                        value={newPass}
                        className="profile-input"
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="New Password"
                    />
                    <input
                        type="password"
                        value={confirmPass}
                        className="profile-input"
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="Confirm Password"
                    />
                </div>
                <div className="profile-button">
                    <MyButton
                        buttonType="button"
                        buttonText="Update"
                        iconName={faKey}
                        onClick={handleUpdate}
                    />
                </div>
            </div>
            {isModalOpen
                ? <ChangeNameEmailModal setIsOpen={setIsModalOpen} user={user} />
                : null
            }
        </div>

    )
}
