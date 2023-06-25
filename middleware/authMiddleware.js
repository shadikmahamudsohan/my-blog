import User from "@/models/userModel";

export const authMiddleware = async (req, res, next) => {
    const { email, role } = req.body;

    try {
        const user = await User.find({ email });

        const userRole = user[0]?.role;
        if (userRole !== "admin") {
            return res.status(403).json({
                status: "fail",
                error: "You are not authorized to access this.",
            });
        }

        req.userData = { email, role }; // Adding user data to the request object
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
};
