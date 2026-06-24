import { faArrowRightArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import MyButton from "../EntryButton/MyButton"
import { useAppSelector } from "../../hooks/redux"
import { useState } from "react"
import ChangeCurrencyModal from "../modals/ChangeCurrencyModal"


export default function Settings() {
    const { currency } = useAppSelector(state => state.dataReducer)

    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleUpdate() {
        setIsModalOpen(true)
    }


    return (
        <div className="settings-content-container">
            <div className="settings-item">
                <div className="settings-title">App Info</div>
                <div className="settings-description">Below are the current setup for this app</div>
                <div className="settings-info-container">
                    <div className="settings-currency-item">Current Currency:</div>
                    <div className="settings-currency-item settings-currency profile-name">{currency}</div>
                    <div className="settings-currency-item change-currency-btn"></div>
                </div>
                <div className="settings-button">
                    <MyButton
                        buttonType="button"
                        buttonText="Update"
                        iconName={faFloppyDisk}
                        onClick={handleUpdate}
                    />
                </div>
            </div>
            <div className="settings-item">
                <div className="settings-title">Interface Settings</div>
                <div className="settings-description">Below are the current setup for this UI</div>
                <div className="settings-info-container">
                    <div className="settings-currency-item">Menu Color:</div>
                    <div className="settings-currency-item settings-currency profile-name">Classic</div>
                    <div className="change-button">
                        <MyButton
                            buttonType="button"
                            buttonText="Change"
                            iconName={faArrowRightArrowLeft}
                            onClick={() => { }}
                        />
                    </div>
                    {/* <div className="settings-currency-item change-currency-btn"></div> */}
                </div>
                <div className="settings-info-container">
                    <div className="settings-currency-item">Language:</div>
                    <div className="settings-currency-item settings-currency profile-name">English</div>
                    <div className="change-button">
                        <MyButton
                            buttonType="button"
                            buttonText="Change"
                            iconName={faArrowRightArrowLeft}
                            onClick={() => { }}
                        />
                    </div>
                    {/* <div className="settings-currency-item change-currency-btn"></div> */}
                </div>
            </div>
            {isModalOpen
                ? <ChangeCurrencyModal setIsOpen={setIsModalOpen} />
                : null
            }
        </div>

    )
}
