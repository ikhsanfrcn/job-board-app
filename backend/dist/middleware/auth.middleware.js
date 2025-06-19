"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    verifyToken(req, res, next) {
        var _a;
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token) {
                res.status(400).json({ message: "Unauthorized" });
                return;
            }
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            if ((decoded === null || decoded === void 0 ? void 0 : decoded.role) === "company") {
                req.company = {
                    id: decoded.id,
                    role: decoded.role,
                };
            }
            else {
                req.user = {
                    id: decoded.id,
                    role: decoded.role,
                };
            }
            next();
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }
    verifyRole(req, res, next) {
        var _a;
        try {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "developer") {
                res.status(403).json({ message: "developer only" });
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
