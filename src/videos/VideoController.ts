import { Request, Response } from 'express';
import { VideoDTO } from './types/videoDTO';
import { RequestParam } from '../types/request';
import { CreateVideoBody } from './types/createVideoBody';
import { ErrorMessages } from '../types/errorMessage';
import { validateVideo } from './validation/validateVideo';
import { IVideoService, VideoService } from './services/VideoServices';
import { DB } from '../db/db';
import { IVideoEditConfig } from './types/videoEditConfig';
import { req } from './../../__test__/test-helpers';

class VideoController {
    private static instance: VideoController;

    private videoService: IVideoService;
    
    private errors: ErrorMessages | null;

    private constructor(videoService: IVideoService) {
        this.videoService = videoService;
        this.errors = null;
    }

    get errorMessages() {
        return this.errors ?? null;
    }

    set errorMessages(error: ErrorMessages | null) {
        this.errors = error
    }

    checkParam(id: string): boolean {
        return this.videoService.checkParam(id);
    }

    public static getInstance(videoService: IVideoService): VideoController {
        if (!VideoController.instance) {
            VideoController.instance = new VideoController(videoService);
        }
        return VideoController.instance;
    }

    public getVideos(req: Request, res: Response<any>) {
        res.status(200).json(this.videoService.getVideos());
    }

    public getVideoById(req: Request<RequestParam, unknown, unknown, unknown>, res: Response<any>) {
        const video = this.videoService.getVideoById(req.params.id);
        if (video) {
            res.status(200).json(video);
        } else {
            res.status(404).json({ text: "Видео не найдено" });
        }
    }

    public createVideo(req: Request<unknown, unknown, CreateVideoBody>, res: Response<VideoDTO | ErrorMessages>) {
        const error = validateVideo(req.body);
        if (error) {
            res.status(400).json({ errorsMessages: [error] });
            return;
        }
        const { author, title, availableResolutions, canBeDownloaded, minAgeRestriction } = req.body;
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const idx = String(new Date().getTime())
        const newVideo: VideoDTO | undefined =
            this.videoService.addVideo({
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

    public editVideo(req: Request<RequestParam, unknown, IVideoEditConfig>, res: Response) {
        if (!this.checkParam(req.params.id)) {
            res.sendStatus(404);
            return;
        }
        const error = validateVideo(req.body);
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
        })
        res.sendStatus(204);
        return;
    }

    public deleteVideo(req: Request<RequestParam, unknown, unknown>, res: Response) {
        if (!this.checkParam(req.params.id)) {
            res.sendStatus(404);
            return;
        }
        this.videoService.deleteVideo(req.params.id);
        res.sendStatus(204);
    }
}

const database = DB.getInstance();

// Инициализация сервиса
const videoService = new VideoService(database);

const videoController = VideoController.getInstance(videoService);
export default videoController;
