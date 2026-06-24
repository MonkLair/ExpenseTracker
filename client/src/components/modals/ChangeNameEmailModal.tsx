import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../EntryButton/MyButton";
import { useAppDispatch } from "../../hooks/redux";
import { updateEmail, updateName } from "../../store/reducers/authSlice";
import { useState } from "react";
import { IUser } from "../../models/IUser";

interface ModalProps {
    setIsOpen: (value: React.SetStateAction<boolean>) => void,
    user: IUser
}


export default function ChangeNameEmailModal({ setIsOpen, user }: ModalProps) {
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const dispatch = useAppDispatch()

    function handleNameUpdate() {
        dispatch(updateName({ newName, email: user.email }))
        setNewName('')
        setIsOpen(false)
    }

    function handleEmailUpdate() {
        dispatch(updateEmail({ newEmail, email: user.email }))
        setNewEmail('')
        setIsOpen(false)
    }

    return (
        <div onClick={() => setIsOpen(false)} className="profile-modal-container">
            <div onClick={(e) => e.stopPropagation()} className="profile-modal">
                <div className="update-block">
                    <div className="profile-name-item">Name</div>
                    <div>
                        <input
                            type="text"
                            className="profile-input modal-input"
                            placeholder="Enter new name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div>
                        <MyButton
                            buttonType="button"
                            buttonText="Update"
                            iconName={faPenToSquare}
                            onClick={handleNameUpdate}
                        />
                    </div>
                </div>
                <div className="update-block">
                    <div className="profile-email-item">Email</div>
                    <div>
                        <input
                            type="text"
                            className="profile-input modal-input"
                            placeholder="Enter new email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <MyButton
                            buttonType="button"
                            buttonText="Update"
                            iconName={faPenToSquare}
                            onClick={handleEmailUpdate}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}