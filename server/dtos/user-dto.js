module.exports = class UserDto {
    name;
    email;
    password;
    id

    constructor(model) {
        this.name = model.name
        this.email = model.email
        this.password = model.password
        this.id = model._id
    }
}