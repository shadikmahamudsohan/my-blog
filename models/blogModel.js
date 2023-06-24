import { Schema, model } from "mongoose";

let Blog;

try {
    Blog = model("Blog");
} catch {
    const blogSchema = new Schema({
        description: {
            type: String,
            required: [true, "please provide a short description"],
        },
        imageName: {
            type: String,
            required: [true, "please provide a image name"],
        },
        title: {
            type: String,
            required: [true, "please provide a short description"],
        }
    }, {
        timestamps: true,
    });

    Blog = model("Blog", blogSchema);
}

export default Blog;