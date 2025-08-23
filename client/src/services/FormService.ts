export default class FormService {
    static checkEmailForm(email: string) {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && reg.test(email)) {
            return true
        }
        else if (!email) {
            return false
        }
        else {
            return 1
        }
    }

    static checkPasswordForm(password: string) {
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

    static checkNameForm(name: string) {
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

    static checkConfirmForm(confirm: string, password: string) {
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

    static checkLogin(email: string, password: string) {
        if (this.checkEmailForm(email) === true && this.checkPasswordForm(password) === true) {
            return true
        } else return false
    }

    static checkRegister(email: string, password: string, name: string, confirm: string) {
        if (this.checkEmailForm(email) === true
        && this.checkPasswordForm(password) === true
        && this.checkNameForm(name) === true
        && this.checkConfirmForm(confirm, password) === true
        ) {
            return true
        } else return false
    }
}
