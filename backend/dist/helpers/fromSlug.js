"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromSlug = fromSlug;
function fromSlug(slug) {
    if (!slug)
        return "";
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
