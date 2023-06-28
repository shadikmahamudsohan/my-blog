import { connectMongoDB } from "../../libs/mongoConnect";
import Blog from "../../models/blogModel";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({ msg: "Only GET request are allowed" });
        return;
    }
    try {
        await connectMongoDB();
        const data = await Blog.find().sort({ createdAt: -1 });
        if (data) {
            res.status(200).send({
                success: true,
                result: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}