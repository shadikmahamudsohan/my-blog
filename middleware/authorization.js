const { default: User } = require("@/models/userModel");

module.exports = async (email, role, res) => {
    try {
        const userData = User.findOne({ email: email });
        if (userData.role !== role) {
            return res.status(401).json({
                status: "Fail",
                error: "You are not authorized"
            });
        }
    } catch (error) {
        return res.status(401).json({
            status: "Fail",
            error: "Some thing went wrong"
        });
    }
};