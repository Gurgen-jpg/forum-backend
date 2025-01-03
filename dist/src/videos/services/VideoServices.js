"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
class VideoService {
    constructor(database) {
        this.database = database;
    }
    checkParam(id) {
        var _a, _b;
        return (_b = (_a = this.getVideos()) === null || _a === void 0 ? void 0 : _a.some(video => video.id === id)) !== null && _b !== void 0 ? _b : false;
    }
    addVideo(video) {
        this.database.videos = [...this.database.videos, video];
        return this.database.getVideoById(video.id);
    }
    getVideoById(id) {
        return this.database.getVideoById(id);
    }
    getVideos() {
        var _a;
        return (_a = this.database.videos) !== null && _a !== void 0 ? _a : [];
    }
    editVideo(id, video) {
        this.database.videos = this.getVideos().map(el => {
            if (el.id === id) {
                return (Object.assign(Object.assign({}, el), { author: video.author ? video.author : el.author, title: video.title ? video.title : el.title, minAgeRestriction: video.minAgeRestriction ? video.minAgeRestriction : el.minAgeRestriction, availableResolutions: video.availableResolutions ? video.availableResolutions : el.availableResolutions, publicationDate: new Date().toISOString() }));
            }
            else {
                return el;
            }
        });
    }
    deleteVideo(id) {
        this.database.deleteVideo(id);
    }
}
exports.VideoService = VideoService;
