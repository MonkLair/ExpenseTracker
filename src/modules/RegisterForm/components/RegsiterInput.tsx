import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { registerSlice } from '../store/RegisterSlice'

interface InputProps {
    stateType: 'emailValue' | 'passwordValue' | 'nameValue' | 'confirmPasswordValue',
    iconName: IconProp,
    inputType: string,
    changeType: ChangeTypes,
}
type ChangeTypes = 'changeEmailValue' | 'changePasswordValue' | 'changeNameValue' | 'changeConfirmPasswordValue'

export default function RegisterInput({stateType, iconName, inputType, changeType}: InputProps) {
    const value = useAppSelector((state) => state.registerReducer[stateType])
    const changeValue = registerSlice.actions[changeType]
    const dispatch = useAppDispatch()
    inputType = inputType === 'text' ? 'name' : stateType === 'confirmPasswordValue' ? 'Confirm Password' : inputType

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
