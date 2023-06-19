import { Schema, model } from "mongoose";

const userSchema = Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name"]
    },

    lastName: {
        type: String,
        required: [true, "Please enter your last name"]
    },

    age: {
        type: Number,
        required: [true, "Please enter your age"]
    },

    phone: {
        type: String,
        required: [true, "Please enter your phone number"]
    },

    gender: {
        type: String,
        // enum: ['male', 'female']
    }

},
    {
        timestamps: true
    }
)

export default model("User", userSchema);
