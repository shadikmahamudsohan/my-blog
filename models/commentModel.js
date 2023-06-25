import mongoose, { Schema, model } from "mongoose";
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
let Comment;

try {
    Comment = model("comment");
} catch {
    const commentSchema = new Schema({
        comment: {
            type: String,
            required: [true, "please provide a short description"],
        },
        name: {
            type: String,
            required: [true, "please provide a image name"],
        },
        email: {
            type: String,
            required: [true, "please provide a short description"],
            validate: [validator.isEmail, "Provide a valid Email"]
        },
        status: {
            type: String,
            enum: ["approved", "waiting", "declined"],
            default: "waiting",
        },
        blogId: {
            type: ObjectId,
            require: [true, "please add the blog id"]
        }
    }, {
        timestamps: true,
    });

    Comment = model("comment", commentSchema);
}

export default Comment;