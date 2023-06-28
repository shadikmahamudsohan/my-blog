import User from "@/models/userModel";
import { connectMongoDB } from "../../libs/mongoConnect";
import { generateToken } from "../../utils/Token";

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        res.status(405).send({ msg: "Only PUT request are allowed" });
        return;
    }
    const userData = req.body;

    try {
        await connectMongoDB();
        const data = await User.updateOne({ email: userData.email }, { $set: { userData } }, { upsert: true });
        if (data) {
            const token = generateToken(userData);
            res.status(200).send({
                success: true,
                result: data,
                token
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}