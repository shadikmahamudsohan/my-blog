const jwt = require("jsonwebtoken");

exports.generateToken = (userData) => {
    try {
        const payload = {
            email: userData.email,
        };

        const token = jwt.sign(payload, "9a0e4502e31dae1c5b71f30a823de6b49d03bde17ad3165c4e9bbd652ab0a066a5988335e1e037c83a63fedd65bf2e1f91dfc1fa1597da4df6f6903114597618");

        return token;
    } catch (error) {
        return false;
    }
};