import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface InputProps {
    setValue: (value: React.SetStateAction<string>) => void
    iconName: IconProp,
    inputType: string,
    formValue: string
}

export default function LoginInput({ setValue, iconName, inputType, formValue }: InputProps) {
    const name = inputType === 'text' ? 'name' : inputType
    return (
        <div className='my-input-container'>
            <FontAwesomeIcon icon={iconName} className='input-icon' />
            <input
                autoComplete='off'
                className='my-input'
                placeholder={name[0].toUpperCase() + name.slice(1)}
                type={inputType}
                onChange={(e) => setValue(e.target.value)}
                value={formValue ? formValue : ''}
            />
        </div>
    )
}
