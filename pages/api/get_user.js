import verifyToken from "@/middleware/verifyToken";
import { connectMongoDB } from "../../libs/mongoConnect";
import User from "../../models/userModel";
import { authMiddleware } from "@/middleware/authMiddleware";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({ msg: "Only GET request are allowed" });
        return;
    }
    try {
        await connectMongoDB();
        await verifyToken(req, res);
        req.requiredRole = "admin";
        authMiddleware(req, res, async () => {
            const data = await User.find();
            if (data) {
                res.status(200).send({
                    success: true,
                    result: data
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}