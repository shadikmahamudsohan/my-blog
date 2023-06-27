import User from "@/models/userModel";
import { connectMongoDB } from "../../libs/mongoConnect";
import verifyToken from "../../middleware/verifyToken";
import authorization from "@/middleware/authorization";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).send({ msg: "Only get request are allowed" });
        return;
    }

    try {
        await connectMongoDB();
        await verifyToken(req, res);
        const { email } = req.user;
        const data = await User.findOne({ email });
        res.status(200).json({
            success: true,
            result: data
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message, msg: "Something went wrong" });
    }
}