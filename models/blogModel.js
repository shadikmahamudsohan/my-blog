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
    }, {
        timestamps: true,
    });

    Blog = model("Blog", blogSchema);
}

export default Blog;