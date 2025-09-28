import jwt from 'jsonwebtoken';

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try{
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({message: "No token, authorization denied"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({message: "Access denied"});
        }

        next();
    } catch (error){
        res.status(401).json({message: "Token is not valid"});
    }
}
};

export default authMiddleware;