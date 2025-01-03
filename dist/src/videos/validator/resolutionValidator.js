"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolutionValidator = void 0;
const resolutionValidator = (req, res, next) => {
    const resol = req.body.availableResolutions;
    if (!resol)
        return next();
    //@ts-ignore
    resol.array.forEach(element => {
        if (!resolutions.find(element)) {
            return res.send;
        }
    });
};
exports.resolutionValidator = resolutionValidator;
