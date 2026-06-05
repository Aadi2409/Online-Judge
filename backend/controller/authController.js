const bcrypt = require('bcrypt');
const AuthUser = require('../model/User');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../validators/userValidator');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
};

const register = async (req, res) => {

    //get the user data from the request body
    //can be written as given below as well
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const email = req.body.email;
    // const password = req.body.password;

    const { username, email, password } = req.body;

    //check if the user data exists
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    //console.log(username, email, password);

    //validate the user data
    const result = validateUser(req.body);
    if (Object.keys(result).length > 0) {
        return res.status(400).json({ message: "Invalid user data", errors: result });
    }

    //check if the user already exists in the database
    const user = await AuthUser.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save the user data to the database
    const newUser = await AuthUser.create({
        username,
        email,
        password: hashedPassword
    });

    //send a response to the client
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.cookie('token', token, cookieOptions);
    return res.status(201).json({ message: "User registered successfully", newUser });
}

const login = async (req, res) => {

    //get username and password from the request body
    const { username, password } = req.body;

    //check if all required fields are present
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    //validate the user email and password format
    const result = validateUser(req.body, true);
    if (Object.keys(result).length > 0) {
        return res.status(400).json({ message: "Invalid user data", errors: result });
    }

    //find the user in the database
    const foundUser = await AuthUser.findOne({ username });
    if (!foundUser) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    //compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    //generate a JWT token
    const token = jwt.sign({ id: foundUser._id, username: foundUser.username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    //send the token to the client
    res.cookie('token', token, cookieOptions);
    return res.status(200).json({ message: "Login successful", foundUser });
}

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
