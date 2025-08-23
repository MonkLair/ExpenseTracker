export type errorType = {
    email: 'emptyError' | 'unvalidEmailError' | '',
    password: 'emptyError' | 'incorrectError' | 'shortPasswordError' | '',
    name: 'emptyError' | 'shortNameError' | '',
    confirm: 'emptyError' | 'matchError' | ''
}

export type emailErrorType = 'emptyError' | 'unvalidEmailError' | ''
export type passwordErrorType = 'emptyError' |'shortPasswordError' | ''
export type nameErrorType = 'emptyError' | 'shortNameError' | ''
export type confirmErrorType = 'emptyError' | 'matchError' | ''