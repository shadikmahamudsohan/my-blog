import User from "@/models/userModel";

export const authMiddleware = async (req, res, next) => {
    const { email } = req.user;

    try {
        const user = await User.find({ email });
        const userRole = user[0]?.role;
        if (userRole !== req.requiredRole) {
            return res.status(403).json({
                status: "fail",
                error: "You are not authorized to access this.",
            });
        }

        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message, msg: "Something went wrong" });
    }
};
