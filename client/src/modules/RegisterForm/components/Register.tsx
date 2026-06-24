import { Link, useNavigate } from 'react-router'
import { faAddressCard, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '../../../hooks/redux'
import { useEffect, useState } from 'react'
import { registerSlice } from '../store/RegisterSlice'
import MyButton from '../../../components/EntryButton/MyButton'
import Incorrect from '../../../components/IncorrectSection/Incorrect'
import LanguageBtn from '../../../components/LanguageButton/LanguageBtn'
import ErrorService from '../../../services/ErrorService'
import FormService from '../../../services/FormService'
import { register } from '../../../store/reducers/authSlice'
import LoginInput from './LoginInput'

export function Register() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const registerState = useAppSelector(state => state.registerReducer)
    const authState = useAppSelector(state => state.authReducer)

    const { clearAll,
        setConfirmErrorType,
        setEmailErrorType,
        setNameErrorType,
        setPasswordErrorType } = registerSlice.actions

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [registerApiError, setRegisterApiError] = useState('')

    useEffect(() => {
        if (authState.isAuth) {
            navigate('/dashboard/main')
        }
    }, [authState.isAuth, navigate])

    useEffect(() => {
        setRegisterApiError(authState.registerApiError)
    }, [authState.registerApiError])

    async function handleSubmit() {
        if (FormService.checkRegister(email, password, name, confirm)) {
            try {
                dispatch(clearAll())
                await dispatch(register({ name, email, password }))
            } catch (e) {
                console.log(e)
            }

        } else {
            const { emailErrorType,
                passwordErrorType,
                confirmErrorType,
                nameErrorType } = ErrorService.handleRegisterForm(email, password, name, confirm)
            dispatch(setEmailErrorType(emailErrorType))
            dispatch(setPasswordErrorType(passwordErrorType))
            dispatch(setNameErrorType(nameErrorType))
            dispatch(setConfirmErrorType(confirmErrorType))
        }
    }

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
                    <LoginInput
                        formValue={name}
                        setValue={setName}
                        iconName={faAddressCard}
                        inputType='text'
                    />
                </div>
                <Incorrect inputType='name' errorType={registerState.errorType} />
                <div className="login-block-item">
                    <LoginInput
                        setValue={setEmail}
                        formValue={email}
                        iconName={faEnvelope}
                        inputType='email'
                    />
                </div>
                <Incorrect inputType='email' errorType={registerState.errorType} />
                <div className="login-block-item">
                    <LoginInput
                        formValue={password}
                        setValue={setPassword}
                        iconName={faKey}
                        inputType='password'
                    />
                </div>
                <Incorrect inputType='password' errorType={registerState.errorType} />
                <div className="login-block-item">
                    <LoginInput
                        setValue={setConfirm}
                        formValue={confirm}
                        iconName={faKey}
                        inputType='password'
                    />
                </div>
                <Incorrect inputType='confirm' errorType={registerState.errorType} />
                {registerApiError
                ? <div className='api-error login-block-item'>
                    {registerApiError}
                </div>
                : ''
                }
                <div className="login-block-item">
                    <MyButton
                        onClick={handleSubmit}
                        buttonText='Register'
                        buttonType='submit'
                        iconName={faRightToBracket}
                    />
                </div>
                <div className="login-block-item link">
                    <Link onClick={() => dispatch(clearAll())} to={'/login'} className='links'>Login</Link>
                </div>
            </div>
        </>
    )
}
