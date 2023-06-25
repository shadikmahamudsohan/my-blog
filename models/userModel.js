import { Schema, model } from "mongoose";
const validator = require("validator");
let User;

try {
    User = model("user");
} catch {
    const userSchema = new Schema({
        email: {
            type: String,
            required: [true, "please provide a short description"],
            validate: [validator.isEmail, "Provide a valid Email"]
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    }, {
        timestamps: true,
    });

    User = model("user", userSchema);
}

export default User;