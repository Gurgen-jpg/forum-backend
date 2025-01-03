import { Router } from "express";
import videoController from "./VideoController";

export const videoRouter = Router();

videoRouter.get("/", videoController.getVideos.bind(videoController));
videoRouter.get("/:id", videoController.getVideoById.bind(videoController));
videoRouter.post("/", videoController.createVideo.bind(videoController));
videoRouter.put("/:id", videoController.editVideo.bind(videoController));
videoRouter.delete("/:id", videoController.deleteVideo.bind(videoController));