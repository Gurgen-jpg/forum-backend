export interface CreateVideoBody {
    "title": string,
    "author": string,
    "canBeDownloaded"?: boolean,
    "minAgeRestriction"?: null | number,
    "availableResolutions": string[]
}