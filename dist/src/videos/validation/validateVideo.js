"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVideo = void 0;
const validateVideo = (body) => {
    if (!(body === null || body === void 0 ? void 0 : body.author)) {
        return ({
            field: "author",
            message: "not found"
        });
    }
    if (!(body === null || body === void 0 ? void 0 : body.title)) {
        return ({
            field: "title",
            message: "not found"
        });
    }
    if (body === null || body === void 0 ? void 0 : body.availableResolutions) {
        body.availableResolutions.forEach(resol => {
            if (!resolutions.some(el => el === resol)) {
                return ({
                    field: "resolution",
                    message: "not found"
                });
            }
        });
    }
    if ((body === null || body === void 0 ? void 0 : body.minAgeRestriction) && typeof Number(body.minAgeRestriction) === "number") {
        if (Number(body.minAgeRestriction) > 18 || Number(body.minAgeRestriction) < 1) {
            return ({
                field: "minAgeRestriction",
                message: "not found"
            });
        }
    }
    return null;
};
exports.validateVideo = validateVideo;
