import { connectMongoDB } from "@/libs/mongoConnect";
import Comment from "@/models/commentModel";

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        res.status(405).send({ msg: "Only patch request are allowed" });
        return;
    }
    const { id } = req.query;
    const { data } = req.body;
    try {
        await connectMongoDB();
        const result = await Comment.findOneAndUpdate(
            { _id: id }, // Find the document with this _id field
            { status: data }, // Update the document with this data
            { new: true } // Return the updated document instead of the original document
        );
        res.status(200).json({
            success: true,
            result: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}