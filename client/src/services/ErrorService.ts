import { confirmErrorType, emailErrorType, nameErrorType, passwordErrorType } from "../models/IErrorTypes";
import FormService from "./FormService";

interface loginReturnValue {
    emailErrorType: emailErrorType,
    passwordErrorType: passwordErrorType
}
interface registerReturnValue {
    emailErrorType: emailErrorType,
    passwordErrorType: passwordErrorType,
    nameErrorType: nameErrorType,
    confirmErrorType: confirmErrorType
}

export default class ErrorService extends FormService {
    static emailErrorType: emailErrorType = ''
    static passwordErrorType: passwordErrorType = ''
    static nameErrorType: nameErrorType = ''
    static confirmErrorType: confirmErrorType = ''

    static handleLoginForm(email: string, password: string): loginReturnValue {
        this.emailErrorType = ''
        this.passwordErrorType = ''

        if (this.checkEmailForm(email) === false) {
            this.emailErrorType = 'emptyError'
        } else if (this.checkEmailForm(email) === 1) {
            this.emailErrorType = 'unvalidEmailError'
        }

        if (this.checkPasswordForm(password) === false) {
            this.passwordErrorType = 'emptyError'
        } else if (this.checkPasswordForm(password) === 1) {
            this.passwordErrorType = 'shortPasswordError'
        }

        return {
            emailErrorType: this.emailErrorType,
            passwordErrorType: this.passwordErrorType
        }
    }

    static handleRegisterForm(email: string, password: string, name: string, confirm: string): registerReturnValue {
        this.emailErrorType = ''
        this.passwordErrorType = ''
        this.nameErrorType = ''
        this.confirmErrorType = ''

        if (this.checkEmailForm(email) === false) {
            this.emailErrorType = 'emptyError'
        } else if (this.checkEmailForm(email) === 1) {
            this.emailErrorType = 'unvalidEmailError'
        }

        if (this.checkPasswordForm(password) === false) {
            this.passwordErrorType = 'emptyError'
        } else if (this.checkPasswordForm(password) === 1) {
            this.passwordErrorType = 'shortPasswordError'
        }

        if (this.checkNameForm(name) === false) {
            this.nameErrorType = 'emptyError'
        } else if (this.checkNameForm(name) === 1) {
            this.nameErrorType = 'shortNameError'
        }

        if (this.checkConfirmForm(confirm, password) === false) {
            this.confirmErrorType = 'emptyError'
        } else if (this.checkConfirmForm(confirm, password) === 1) {
            this.confirmErrorType = 'matchError'
        }

        return {
            emailErrorType: this.emailErrorType,
            passwordErrorType: this.passwordErrorType,
            nameErrorType: this.nameErrorType,
            confirmErrorType: this.confirmErrorType
        }
    }
}