import { connectMongoDB } from "../../libs/mongoConnect";
import User from "../../models/userModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ msg: "Only post request are allowed" });
        return;
    }
    const userData = req.body;
    try {
        await connectMongoDB();
        const data = await User.create(userData);
        if (data) {
            res.status(200).send({
                success: true,
                result: data
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message, msg: "Something went wrong" });
    }
}