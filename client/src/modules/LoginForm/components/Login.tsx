import { Link, useNavigate } from 'react-router'
import { faEnvelope, faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { useEffect, useState } from 'react'
import MyButton from '../../../components/EntryButton/MyButton'
import Incorrect from '../../../components/IncorrectSection/Incorrect'
import LanguageBtn from '../../../components/LanguageButton/LanguageBtn'
import { loginSlice } from '../store/LoginSlice'
import { login } from '../../../store/reducers/authSlice'
import LoginInput from './LoginInput'
import FormService from '../../../services/FormService'
import ErrorService from '../../../services/ErrorService'

export function Login() {
    const navigate = useNavigate()
    const loginState = useAppSelector(state => state.loginReducer)
    const authState = useAppSelector(state => state.authReducer)

    const dispatch = useAppDispatch()
    const { setEmailErrorType, setPasswordErrorType, clearAll } = loginSlice.actions

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loginApiError, setLoginApiError] = useState('')

    useEffect(() => {
        if (authState.isAuth) {
            navigate('/dashboard')
        }
    }, [authState.isAuth, navigate])

    useEffect(() => {
        setLoginApiError(authState.loginApiError)
    }, [authState.loginApiError])

    async function handleSubmit() {
        if (FormService.checkLogin(email, password)) {
            try {
                dispatch(clearAll())
                await dispatch(login({ email, password }))
            } catch (e) {
                console.log(e)
            }

        } else {
            const { emailErrorType, passwordErrorType } = ErrorService.handleLoginForm(email, password)
            dispatch(setEmailErrorType(emailErrorType))
            dispatch(setPasswordErrorType(passwordErrorType))
        }
    }

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
                        setValue={setEmail}
                        iconName={faEnvelope}
                        inputType='email'
                        formValue={email}
                    />
                </div>
                <Incorrect inputType='email' errorType={loginState.errorType} />
                <div className="login-block-item">
                    <LoginInput
                        setValue={setPassword}
                        iconName={faKey}
                        inputType='password'
                        formValue={password}
                    />
                </div>
                <Incorrect inputType='password' errorType={loginState.errorType} />
                {loginApiError
                ? <div className='api-error login-block-item'>
                    {loginApiError}
                </div>
                : ''
                }
                
                <div className="login-block-item">
                    <MyButton
                        onClick={handleSubmit}
                        buttonText='Sign In'
                        buttonType='submit'
                        iconName={faRightToBracket}
                    />
                </div>
                <div className="login-block-item link">
                    <Link onClick={() => dispatch(clearAll())} to={'/register'} className='links'>Register</Link>
                </div>
            </div>
        </>
    )
}
