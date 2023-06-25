import { connectMongoDB } from "../../libs/mongoConnect";
import Blog from "../../models/blogModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ msg: "Only post request are allowed" });
        return;
    }
    const blogData = req.body;
    console.log(blogData);
    try {
        await connectMongoDB();
        const data = await Blog.create(blogData);
        if (data) {
            res.status(200).send({
                success: true,
                result: data
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message, msg: "Something went wrong" });
    }
}