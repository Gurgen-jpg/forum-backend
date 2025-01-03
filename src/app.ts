import express from "express";
import cors from "cors";
import { videoRouter } from "./videos";
import { testingRouter } from "./testing";

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({ version: "1.0" });
});

app.use("/videos", videoRouter);
app.use("/testing", testingRouter)

