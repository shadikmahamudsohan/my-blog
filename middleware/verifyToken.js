const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: "Fail",
                error: "You are not logged in"
            });
        }

        const decode = await promisify(jwt.verify)(token, "9a0e4502e31dae1c5b71f30a823de6b49d03bde17ad3165c4e9bbd652ab0a066a5988335e1e037c83a63fedd65bf2e1f91dfc1fa1597da4df6f6903114597618");

        req.user = decode;

        console.log(token);
    } catch (error) {
        return res.status(401).json({
            status: "Fail",
            error: "Invalid token"
        });
    }
};
