import { VideoDTO } from "../videos/types/videoDTO";

export type DBType = {
    videos: VideoDTO[]
}

export interface IDatabase {
    videos: VideoDTO[];
    getVideoById(id: string): VideoDTO | undefined;
    addNewVideo(newVideo: VideoDTO): VideoDTO | undefined;
    deleteVideo(id: string): void;
    delteAllData(): void;
}

export class DB implements IDatabase {
    private static instance: DB;

    db: DBType;

    constructor() {
        this.db = {
            videos: []
        }
    }

    public delteAllData() {
        this.db = {
            videos: []
        }
    }

    public static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    get videos() {
        return this.db.videos;
    }

    set videos(videos: VideoDTO[]) {
        this.db.videos = videos;
    }

    public getVideoById(id: string) {
        return this.videos.find(vid => vid.id === id);
    }

    public addNewVideo(newVideo: VideoDTO) {
        this.videos = [...this.db.videos, newVideo];
        return newVideo;
    }

    public deleteVideo(id: string) {
        this.videos = this.videos.filter(el => el.id !== id);
    }
}

const db = new DB();
export default db;