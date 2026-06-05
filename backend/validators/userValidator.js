function validateUser(user, isLogin = false) {
    let errors = {};

    // Registration-only checks
    if (!isLogin) {
        if (!user.username || user.username.trim() === "") {
            errors.username = "User name is required";
        }
    }

    // Registration-only email checks
    if (!isLogin) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!user.email || user.email.trim() === "") {
            errors.email = "Email is required";
        }
        else if (!emailRegex.test(user.email)) {
            errors.email = "Invalid email format";
        }
    }

    if (!user.password || user.password.trim() === "") {
        errors.password = "Password is required";
    }

    return errors;
}

module.exports = { validateUser };
