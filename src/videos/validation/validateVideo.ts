import { ErrorMessage } from "../../types/errorMessage";
import { CreateVideoBody } from "../types/createVideoBody";

export const validateVideo = (body: Partial<CreateVideoBody>): null | ErrorMessage => {
    if (!body?.author) {
        return ({
            field: "author",
            message: "not found"
        })
    }

    if (!body?.title) {
        return ({
            field: "title",
            message: "not found"
        })
    }

    if (body?.availableResolutions) {
        body.availableResolutions.forEach(resol => {
            if (!resolutions.some(el => el === resol)) {
                return ({
                    field: "resolution",
                    message: "not found"
                })
            }
        })
    }

    if (body?.minAgeRestriction && typeof Number(body.minAgeRestriction) === "number") {
        if (Number(body.minAgeRestriction) > 18 || Number(body.minAgeRestriction) < 1) {
            return ({
                field: "minAgeRestriction",
                message: "not found"
            })
        }
    }
    return null
}