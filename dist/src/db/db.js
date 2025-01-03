"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
class DB {
    constructor() {
        this.db = {
            videos: []
        };
    }
    delteAllData() {
        this.db = {
            videos: []
        };
    }
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }
    get videos() {
        return this.db.videos;
    }
    set videos(videos) {
        this.db.videos = videos;
    }
    getVideoById(id) {
        return this.videos.find(vid => vid.id === id);
    }
    addNewVideo(newVideo) {
        this.videos = [...this.db.videos, newVideo];
        return newVideo;
    }
    deleteVideo(id) {
        this.videos = this.videos.filter(el => el.id !== id);
    }
}
exports.DB = DB;
const db = new DB();
exports.default = db;
