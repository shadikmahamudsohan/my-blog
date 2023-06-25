import { connectMongoDB } from "../../libs/mongoConnect";
import Comment from "../../models/commentModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ msg: "Only post request are allowed" });
        return;
    }
    const commentData = req.body;
    try {
        await connectMongoDB();
        const data = await Comment.create(commentData);
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