"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xendit_node_1 = require("xendit-node");
const xenditClient = new xendit_node_1.Xendit({
    secretKey: process.env.SECRET_API_KEY,
});
exports.default = xenditClient;
