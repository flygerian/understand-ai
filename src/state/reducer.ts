import { AppAction, ApplicationState } from "./interfaces"
import { IMAGES_LOADED, LABELS_LOADED, LABEL_SELECTED } from "../components/labels_list/actions"

const initialState: ApplicationState = {
    labelData: [],
    images: []
}

export default function reducer(currentState: ApplicationState = initialState, action: AppAction<any>): ApplicationState {
    switch (action.type) {
        case LABELS_LOADED:
            return { ...currentState, labelData: action.payload }

        case IMAGES_LOADED:
            return { ...currentState, images: action.payload }

        case LABEL_SELECTED:
            return handleLabelSelected(currentState, action.payload)
    }

    return initialState
}

function handleLabelSelected(currentState: ApplicationState, payload: any): ApplicationState {
    const editedImagesList = currentState.images.map(image => {
        if (image.id === payload.imageId) {
            image.labels[payload.key] = payload.label
            return image
        }

        return image
    })

    return { ...currentState, images: editedImagesList }
}