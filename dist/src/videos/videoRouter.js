"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const VideoController_1 = __importDefault(require("./VideoController"));
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.get("/", VideoController_1.default.getVideos.bind(VideoController_1.default));
exports.videoRouter.get("/:id", VideoController_1.default.getVideoById.bind(VideoController_1.default));
exports.videoRouter.post("/", VideoController_1.default.createVideo.bind(VideoController_1.default));
exports.videoRouter.put("/:id", VideoController_1.default.editVideo.bind(VideoController_1.default));
exports.videoRouter.delete("/:id", VideoController_1.default.deleteVideo.bind(VideoController_1.default));
