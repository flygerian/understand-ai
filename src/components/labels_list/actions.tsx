import { Dispatch } from "redux"
import { AppImage, AppImageList, LabelListDto } from "../../data/dto"
import { AppAction } from "../../state/interfaces"

export const LABELS_LOADED = "LABELS_LOADED"
export const IMAGES_LOADED = "IMAGES_LOADED"
export const LABEL_SELECTED = "LABEL_SELECTED"

export function labelsLoadedAction(labelData: LabelListDto): AppAction<LabelListDto> {
    return {
        type: LABELS_LOADED,
        payload: labelData
    }
}

export function imagesLoadedAction(images: AppImageList): AppAction<AppImageList> {
    return {
        type: IMAGES_LOADED,
        payload: images
    }
}

export function labelSelectedAction(imageId: number, key: string, label: string): AppAction<any> {
    return {
        type: LABEL_SELECTED,
        payload: {
            imageId,
            key,
            label
        }
    }
}


export function loadLabelsAction() {
    return (dispatch: Dispatch) => {
        // Ideally this is where you would fire off an http request
        const data: LabelListDto = [
            {
                title: "Weather Condition",
                key: "weather",
                labels: ["rainy", "sunny", "cloudy", "foggy", "snow", "unclear"],
                required: true
            },
            {
                title: "Lane Count",
                key: "lane-count",
                labels: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "unclear"],
                required: true
            },
            {
                title: "Environment",
                key: "environment",
                labels: ["Tunnel", "highway", "inner city", "outer city", "unclear"],
                required: false
            },
            {
                title: "Corrupt Image",
                key: "corrupt-image",
                labels: ["Yes", "No"],
                required: false
            }
        ]

        dispatch(labelsLoadedAction(data))
    }
}

export function loadImagesAction() {
    return (dispatch: Dispatch) => {
        const data: AppImageList = [
            {
                id: 1,
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/St_Kilda_Road_start.jpg",
                labels: {}
            },
            {
                id: 2,
                imageUrl: "https://terryxphotography.files.wordpress.com/2016/04/berlin-streets-2-1-of-1.jpg?w=600",
                labels: {}
            }
        ]

        dispatch(imagesLoadedAction(data))
    }
}

export function saveImageAndLabelsAction(image: AppImage) {
    return (dispatch: Dispatch) => {
        console.log("Saving labels...")
        // TODO: Can post to web service here
    }
}