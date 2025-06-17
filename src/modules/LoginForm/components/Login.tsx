import { Link, useNavigate } from 'react-router'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { useEffect, useState } from 'react'
import MyButton from '../../../components/EntryButton/MyButton'
import Incorrect from '../../../components/IncorrectSection/Incorrect'
import LanguageBtn from '../../../components/LanguageButton/LanguageBtn'
import { loginSlice } from '../store/LoginSlice'
import { handleLoginForm } from '../helpers/loginHelper'
import LoginInput from './LoginInput'

export function Login() {
    const navigate = useNavigate()
    const loginState = useAppSelector(state => state.loginReducer)
    const dispatch = useAppDispatch()
    const actions = loginSlice.actions

    const [isClicked, setIsClicked] = useState<boolean>(false)

    useEffect(() => {
        if (isClicked) {
            handleLoginForm(dispatch, actions, loginState)
        }

    }, [loginState])

    return (
        <>
            <div className="login-block">
                <div className="login-block-item login-title">
                    <h1>Login</h1>
                    <LanguageBtn />
                </div>
                <div className="login-block-item login-enter">
                    Enter login credentials
                </div>
                <div className="login-block-item">
                    <LoginInput
                        stateType='emailValue'
                        iconName={faEnvelope}
                        inputType='email'
                        changeType='changeEmailValue'
                    />
                </div>
                <Incorrect inputType='email' errorType={loginState.errorType}/>
                <div className="login-block-item">
                    <LoginInput
                        stateType='passwordValue'
                        iconName={faKey}
                        inputType='password'
                        changeType='changePasswordValue'
                    />
                </div>
                <Incorrect inputType='password' errorType={loginState.errorType}/>
                <div className="login-block-item">
                    <MyButton
                        onClick={
                            (e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault()
                                setIsClicked(true)
                                if (handleLoginForm(
                                    dispatch,
                                    actions,
                                    loginState
                                )) navigate('/dashboard')
                            }
                        }
                        buttonText='Sign In'
                        buttonType='submit'
                        iconName={faRightToBracket}
                    />
                </div>
                <div className="login-block-item link">
                    <Link onClick={() => dispatch(actions.clearAll())} to={'/register'} className='links'>Register</Link>
                </div>
            </div>
        </>
    )
}
