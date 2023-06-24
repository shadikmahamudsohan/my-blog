import { connectMongoDB } from "../../../libs/mongoConnect";
import Blog from "../../../models/blogModel";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.status(405).send({ msg: "Only DELETE request are allowed" });
        return;
    }
    const { id } = req.query;
    console.log(id);
    try {
        await connectMongoDB();
        const data = await Blog.deleteOne({ _id: id });
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