const AUTH_TOKEN = process.env.AUTH_TOKEN || "i-luv-cec"; 

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["x-auth-token"];

    if(!authHeader || authHeader !== AUTH_TOKEN) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}


module.exports = authMiddleware;