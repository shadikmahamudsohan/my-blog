import { connectMongoDB } from "../../libs/mongoConnect";
import Blog from "../../models/blogModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ msg: "Only post request are allowed" });
        return;
    }
    const blogData = req.body;
    try {
        await connectMongoDB();
        const data = await Blog.create(blogData);
        if (data) {
            res.status(201).send({
                success: true,
                result: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}