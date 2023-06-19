import { findById, findOne, create } from '../models/userModel';
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
require("dotenv").config();

const getUser = async (req, res) => {
    const user = await findById(req.user.id, { password: 0 });
    res.json(user);
}

const userRegister = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const foundUser = await findOne({ email: email });
    if (foundUser) {
        res.status(400).json({ message: "User already exists" });
    } else {
        const user = await create({
            email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            phone: req.body.phone,
            gender: req.body.gender
        });
        res.json(user.id);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await findOne({ email });
    //console.log(user);
    if (user && (await compare(password, user.password))) {
        const accessToken = sign( //signing the token
            //payload
            {
                user: {
                    email: user.email,
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    phone: user.phone,
                    gender: user.gender
                },
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "10m" }
            //token will stay valid for 10 minutes
        );
        res.status(200).json(accessToken);
        console.log(accessToken);
    } else {
        res.status(401).json({ message: "Wrong email or password" });
    }
};

const UpdateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user properties
        user.email = email;
        user.password = password; // You can handle password updates differently if needed
        // Save the updated user
        const updatedUser = await user.save();
        // Send the updated user as a response
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Delete the user
        await user.remove();
        // Send a success message in response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    getUser,
    userRegister,
    loginUser,
    UpdateUser,
    deleteUser
};
