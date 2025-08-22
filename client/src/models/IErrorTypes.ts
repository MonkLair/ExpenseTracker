export type errorType = {
    email: 'emptyError' | 'unvalidEmailError' | '',
    password: 'emptyError' | 'incorrectError' | 'shortPasswordError' | '',
    name: 'emptyError' | 'shortNameError' | '',
    confirm: 'emptyError' | 'matchError' | ''
}
