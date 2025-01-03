import { IDatabase } from "../../db/db";
import { VideoDTO } from "../types/videoDTO";
import { IVideoEditConfig } from "../types/videoEditConfig";

export interface IVideoService {
    addVideo(video: VideoDTO): VideoDTO | undefined;
    getVideoById(id: string): VideoDTO | undefined;
    getVideos(): VideoDTO[] | undefined;
    editVideo(id: string, video: IVideoEditConfig): void;
    checkParam(id: string): boolean;
    deleteVideo(id: string): void;
}

export class VideoService implements IVideoService {
    private database: IDatabase;

    constructor(database: IDatabase) {
        this.database = database;
    }

    public checkParam(id: string): boolean {
        return this.getVideos()?.some(video => video.id === id) ?? false;
    }

    public addVideo(video: VideoDTO): VideoDTO | undefined {

        this.database.videos = [...this.database.videos, video];
        return this.database.getVideoById(video.id);
    }

    public getVideoById(id: string): VideoDTO | undefined {
        return this.database.getVideoById(id);
    }

    public getVideos(): VideoDTO[] {
        return this.database.videos ?? [] as VideoDTO[];
    }

    public editVideo(id: string, video: IVideoEditConfig) {
        this.database.videos = this.getVideos().map(el => {
            if (el.id === id) {
                return ({
                    ...el,
                    author: video.author ? video.author : el.author,
                    title: video.title ? video.title : el.title,
                    minAgeRestriction: video.minAgeRestriction ? video.minAgeRestriction : el.minAgeRestriction,
                    availableResolutions: video.availableResolutions ? video.availableResolutions : el.availableResolutions,
                    publicationDate: new Date().toISOString(),
                });
            } else {
                return el;
            }
        }) 
    }

    public deleteVideo(id: string) {
            this.database.deleteVideo(id);
    }
}
