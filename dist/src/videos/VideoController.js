"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateVideo_1 = require("./validation/validateVideo");
const VideoServices_1 = require("./services/VideoServices");
const db_1 = require("../db/db");
class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
        this.errors = null;
    }
    get errorMessages() {
        var _a;
        return (_a = this.errors) !== null && _a !== void 0 ? _a : null;
    }
    set errorMessages(error) {
        this.errors = error;
    }
    checkParam(id) {
        return this.videoService.checkParam(id);
    }
    static getInstance(videoService) {
        if (!VideoController.instance) {
            VideoController.instance = new VideoController(videoService);
        }
        return VideoController.instance;
    }
    getVideos(req, res) {
        res.status(200).json(this.videoService.getVideos());
    }
    getVideoById(req, res) {
        const video = this.videoService.getVideoById(req.params.id);
        if (video) {
            res.status(200).json(video);
        }
        else {
            res.status(404).json({ text: "Видео не найдено" });
        }
    }
    createVideo(req, res) {
        const error = (0, validateVideo_1.validateVideo)(req.body);
        if (error) {
            res.status(400).json({ errorsMessages: [error] });
            return;
        }
        const { author, title, availableResolutions, canBeDownloaded, minAgeRestriction } = req.body;
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const idx = String(new Date().getTime());
        const newVideo = this.videoService.addVideo({
            id: idx,
            author,
            title,
            createdAt: now.toISOString(),
            publicationDate: tomorrow.toISOString(),
            availableResolutions,
            minAgeRestriction: minAgeRestriction ? minAgeRestriction : null,
            canBeDownloaded: typeof canBeDownloaded === "boolean" ? canBeDownloaded : false
        });
        res.status(201).json(newVideo);
    }
    editVideo(req, res) {
        if (!this.checkParam(req.params.id)) {
            res.sendStatus(404);
            return;
        }
        const error = (0, validateVideo_1.validateVideo)(req.body);
        if (error) {
            res.status(400).json({ errorsMessages: [error] });
            return;
        }
        this.videoService.editVideo(req.params.id, {
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
        });
        res.sendStatus(204);
        return;
    }
    deleteVideo(req, res) {
        if (!this.checkParam(req.params.id)) {
            res.sendStatus(404);
            return;
        }
        this.videoService.deleteVideo(req.params.id);
        res.sendStatus(204);
    }
}
const database = db_1.DB.getInstance();
// Инициализация сервиса
const videoService = new VideoServices_1.VideoService(database);
const videoController = VideoController.getInstance(videoService);
exports.default = videoController;
