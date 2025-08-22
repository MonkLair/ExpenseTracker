import { Link, useNavigate } from 'react-router'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { useEffect, useState } from 'react'
import { registerSlice } from '../store/RegisterSlice'
import { handleRegisterForm } from '../helpers/registerHelper'
import MyButton from '../../../components/EntryButton/MyButton'
import Incorrect from '../../../components/IncorrectSection/Incorrect'
import LanguageBtn from '../../../components/LanguageButton/LanguageBtn'
import RegisterInput from './RegsiterInput'

export function Register() {
    const navigate = useNavigate()
    const registerState = useAppSelector(state => state.registerReducer)
    const dispatch = useAppDispatch()
    const actions = registerSlice.actions

    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        if (isClicked) {
            handleRegisterForm(dispatch, actions, registerState)
        }

    }, [registerState])

    return (
        <>
            <div className="login-block">
                <div className="login-block-item login-title">
                    <h1>Register</h1>
                    <LanguageBtn />
                </div>
                <div className="login-block-item login-enter">
                    Enter your info to register
                </div>
                <div className="login-block-item">
                    <RegisterInput
                        stateType='nameValue'
                        iconName={faEnvelope}
                        inputType='text'
                        changeType='changeNameValue'
                    />
                </div>
                <Incorrect inputType='name' errorType={registerState.errorType}/>
                <div className="login-block-item">
                    <RegisterInput
                        stateType='emailValue'
                        iconName={faEnvelope}
                        inputType='email'
                        changeType='changeEmailValue'
                    />
                </div>
                <Incorrect inputType='email' errorType={registerState.errorType}/>
                <div className="login-block-item">
                    <RegisterInput
                        stateType='passwordValue'
                        iconName={faKey}
                        inputType='password'
                        changeType='changePasswordValue'
                    />
                </div>
                <Incorrect inputType='password' errorType={registerState.errorType}/>
                <div className="login-block-item">
                    <RegisterInput
                        stateType='confirmPasswordValue'
                        iconName={faEnvelope}
                        inputType='password'
                        changeType='changeConfirmPasswordValue'
                    />
                </div>
                <Incorrect inputType='confirm' errorType={registerState.errorType}/>
                <div className="login-block-item">
                    <MyButton
                        onClick={
                            (e: React.MouseEvent) => {
                                e.preventDefault()
                                setIsClicked(true)
                                if (handleRegisterForm(
                                    dispatch,
                                    actions,
                                    registerState
                                )) navigate('/dashboard')
                            }
                        }
                        buttonText='Register'
                        buttonType='submit'
                        iconName={faRightToBracket}
                    />
                </div>
                <div className="login-block-item link">
                    <Link onClick={() => dispatch(actions.clearAll())} to={'/login'} className='links'>Login</Link>
                </div>
            </div>
        </>
    )
}
