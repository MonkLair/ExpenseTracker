import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { loginSlice } from '../store/LoginSlice'

interface InputProps {
    stateType: 'emailValue' | 'passwordValue',
    iconName: IconProp,
    inputType: 'email' | 'password',
    changeType: ChangeTypes,
}
type ChangeTypes = 'changeEmailValue' | 'changePasswordValue'

export default function LoginInput({stateType, iconName, inputType, changeType}: InputProps) {
    const value = useAppSelector((state) => state.loginReducer[stateType])
    const changeValue = loginSlice.actions[changeType]
    const dispatch = useAppDispatch()

  return (
    <div className='my-input-container'>
        <FontAwesomeIcon icon={iconName} className='input-icon'/>
        <input 
            autoComplete='off'
            className='my-input' 
            placeholder={inputType[0].toUpperCase() + inputType.slice(1)} 
            type={inputType} 
            onChange={(e) => dispatch(changeValue(e.target.value))}
            value={value !== null ? value : ''}
            />
    </div>
  )
}
