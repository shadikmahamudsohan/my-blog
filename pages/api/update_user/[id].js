import { connectMongoDB } from "@/libs/mongoConnect";
import { authMiddleware } from "@/middleware/authMiddleware";
import verifyToken from "@/middleware/verifyToken";
import User from "@/models/userModel";

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        res.status(405).send({ msg: "Only patch requests are allowed" });
        return;
    }

    const data = req.body;
    try {
        await connectMongoDB();
        await verifyToken(req, res);
        const { id } = req.query;
        const { role } = req.body;
        req.requiredRole = "admin";
        // Implementing the middleware
        authMiddleware(req, res, async () => {
            const result = await User.findOneAndUpdate(
                { _id: id },
                { role },
                { new: true }
            );
            res.status(200).json({
                success: true,
                result: result,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}
