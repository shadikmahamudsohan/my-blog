import { connectMongoDB } from "@/libs/mongoConnect";
import { authMiddleware } from "@/middleware/authMiddleware";
import verifyToken from "@/middleware/verifyToken";
import Comment from "@/models/commentModel";

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        res.status(405).send({ msg: "Only patch request are allowed" });
        return;
    }
    const { id } = req.query;
    const { status } = req.body;
    try {
        await connectMongoDB();
        await verifyToken(req, res);
        req.requiredRole = "admin";
        authMiddleware(req, res, async () => {
            const result = await Comment.findOneAndUpdate(
                { _id: id },
                { status: status },
                { new: true }
            );
            res.status(200).json({
                success: true,
                result: result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}