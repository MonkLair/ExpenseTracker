import { Dispatch } from "@reduxjs/toolkit";
import { registerSlice, RegisterState } from "../store/RegisterSlice";


function isValidEmail(login: string) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (login && reg.test(login)) {
        return true
    }
    else if (!login) {
        return false
    }
    else {
        return 1
    }
}

function isValidPassword(password: string) {
    if (password && password.length >= 6) {
        return true
    }
    else if (!password) {
        return false
    }
    else {
        return 1
    }
}

function isValidName(name: string) {
    if (name && name.length >= 4) {
        return true
    }
    else if (!name) {
        return false
    }
    else {
        return 1
    }
}

function isValidConfirm(confirm: string, password: string) {
    if (confirm && confirm === password) {
        return true
    }
    else if (!confirm) {
        return false
    }
    else if (confirm !== password) {
        return 1
    }
}



function isValid(login: string, password: string, name: string, confirm: string): boolean {
    if (isValidEmail(login) === true && isValidConfirm(confirm, password) === true && isValidName(name) === true && isValidPassword(password) === true) {
        return true
    }
    else return false


}

export function handleRegisterForm(dispatch: Dispatch, actions: typeof registerSlice.actions, { emailValue, passwordValue, nameValue, confirmPasswordValue }: RegisterState) {
    if (!isValidEmail(emailValue)) {
        dispatch(actions.setEmailErrorType("emptyError"))
    } else if (isValidEmail(emailValue) === 1) dispatch(actions.setEmailErrorType("unvalidEmailError"))
    else dispatch(actions.setEmailErrorType(''))

    if (!isValidPassword(passwordValue)) {
        dispatch(actions.setPasswordErrorType("emptyError"))
    } else if (isValidPassword(passwordValue) === 1) dispatch(actions.setPasswordErrorType("shortPasswordError"))
    else dispatch(actions.setPasswordErrorType(''))

    if (!isValidName(nameValue)) {
        dispatch(actions.setNameErrorType("emptyError"))
    } else if (isValidName(nameValue) === 1) dispatch(actions.setNameErrorType("shortNameError"))
    else dispatch(actions.setNameErrorType(''))

    if (!isValidConfirm(confirmPasswordValue, passwordValue)) {
        dispatch(actions.setConfirmErrorType("emptyError"))
    } else if (isValidConfirm(confirmPasswordValue, passwordValue) === 1) dispatch(actions.setConfirmErrorType("matchError"))
    else dispatch(actions.setConfirmErrorType(''))

    if (isValid(emailValue, passwordValue, nameValue, confirmPasswordValue)) {
        return true
    }

}
