function validateUser(user) {
    let errors = {};

    if(!user.firstName || user.firstName.trim() === "") {
        errors.firstName = "First name is required";
    }

    if(!user.lastName || user.lastName.trim() === "") {
        errors.lastName = "Last name is required";
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!user.email || user.email.trim() === "") {
        errors.email = "Email is required";
    } else if(!emailRegex.test(user.email)) {
        errors.email = "Invalid email format";
    }

    if(!user.password || user.password.trim() === "") {
        errors.password = "Password is required";
    }

    return errors;
}

module.exports = {validateUser};