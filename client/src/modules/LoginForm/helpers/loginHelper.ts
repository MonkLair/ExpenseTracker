import { Dispatch } from "@reduxjs/toolkit";
import { loginSlice, LoginState } from "../store/LoginSlice";

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

function isValid(login: string, password: string): boolean {
    if (isValidEmail(login) === true && isValidPassword(password) === true) {
        return true
    } else return false
}


export function handleLoginForm(dispatch: Dispatch, actions: typeof loginSlice.actions, { emailValue, passwordValue }: LoginState) {
    if (!isValidEmail(emailValue)) {
        dispatch(actions.setEmailErrorType("emptyError"))
    } else if (isValidEmail(emailValue) === 1) dispatch(actions.setEmailErrorType("unvalidEmailError"))
    else dispatch(actions.setEmailErrorType(''))

    if (!isValidPassword(passwordValue)) {
        dispatch(actions.setPasswordErrorType("emptyError"))
    } else if (isValidPassword(passwordValue) === 1) dispatch(actions.setPasswordErrorType("shortPasswordError"))
    else dispatch(actions.setPasswordErrorType(''))

    if (isValid(emailValue, passwordValue)) {
        return true
    }

}
