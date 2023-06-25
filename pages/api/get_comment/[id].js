import Comment from "@/models/commentModel";
import { connectMongoDB } from "../../../libs/mongoConnect";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({ msg: "Only GET request are allowed" });
        return;
    }
    const { id } = req.query;
    try {
        await connectMongoDB();
        const data = await Comment.find({ blogId: id });
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