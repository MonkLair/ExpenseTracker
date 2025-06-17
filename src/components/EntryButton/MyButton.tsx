import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface buttonProps {
    buttonType: 'submit' | 'reset' | 'button',
    buttonText: string,
    iconName: IconProp,
    onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void)
}

export default function MyButton({ buttonType, buttonText, iconName, onClick}: buttonProps) {

    return (
        <div>
            <button onClick={onClick} className="my-button" type={buttonType}>
                <FontAwesomeIcon icon={iconName} className='button-icon' />
                <span className="my-button-text">{buttonText}</span>
                <span></span>
            </button>
        </div>
    )
}
