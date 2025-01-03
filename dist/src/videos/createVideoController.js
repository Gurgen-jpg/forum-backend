"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = void 0;
const db_1 = require("../db/db");
const createVideoController = (req, res) => {
    const idx = db_1.db.videos.length;
    const time = new Date().toISOString();
    const newVideo = {
        "id": idx,
        "title": req.body.title,
        "author": req.body.author,
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": time,
        "publicationDate": time,
        "availableResolutions": req.body.availableResolutions
    };
};
exports.createVideoController = createVideoController;
