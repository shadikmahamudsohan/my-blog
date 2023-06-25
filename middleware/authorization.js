const User = require("@/models/userModel");

module.exports = (email, role) => {
    return async (req, res, next) => {
        console.log("in");
        const user = await User.findOne({ email }); // getting the data for user database

        const userRole = user?.role;
        if (userRole !== role) {
            return res.status(403).json({
                status: "fail",
                error: 'Your are not authorized to access this.'
            });
        }
        next();
    };
};