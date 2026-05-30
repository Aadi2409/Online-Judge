const bcrypt = require('bcrypt');
const AuthUser = require('../model/authUser');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../validators/userValidator');

const register = async (req, res) => {

    //get the user data from the request body
    //can be written as given below as well
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const email = req.body.email;
    // const password = req.body.password;

    const { firstName, lastName, email, password } = req.body;

    //check if the user data exists
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    //console.log(firstName, lastName, email, password);

    //validate the user data
    const result = validateUser({ firstName, lastName, email, password });
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
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    //send a response to the client
    const token = jwt.sign({ id: newUser._id, email: newUser.email },process.env.JWT_SECRET,{
        expiresIn: '1h',
     });
    return res.status(201).json({ message: "User registered successfully", newUser, token });
}

const login = async (req, res) => {
    res.send("Login Page");
}

module.exports = { register, login };