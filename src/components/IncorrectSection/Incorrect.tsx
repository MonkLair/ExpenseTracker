interface IncorrectProps {
    inputType: 'email' | 'password' | 'name' | 'confirm',
    errorType: {
        email: 'emptyError' | 'unvalidEmailError' | '',
        password: 'emptyError' | 'incorrectError' | 'shortPasswordError' | '',
        name?: 'emptyError' | 'shortNameError' | '',
        confirm?: 'emptyError' | 'matchError' | ''
    }
}

export default function Incorrect({ inputType, errorType }: IncorrectProps) {
        switch (errorType[inputType]) {
            case 'emptyError':
                return (
                    <div className='login-error login-block-item'>
                        {inputType[0].toUpperCase() + inputType.slice(1)} field is required
                    </div>
                )
            case 'matchError':
                return (
                    <div className='login-error login-block-item'>
                        Confirm password does not match
                    </div>
                )
            case 'shortNameError':
                return (
                    <div className='login-error login-block-item'>
                        Name must be at most 4 character
                    </div>
                )
            case 'shortPasswordError':
                return (
                    <div className='login-error login-block-item'>
                        Password must be at most 6 character
                    </div>
                )
            case 'unvalidEmailError':
                return (
                    <div className='login-error login-block-item'>
                        Email must be a valid email
                    </div>
                )
            default:
                return
        }
    }

