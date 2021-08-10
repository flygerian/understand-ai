import { AppImageList, LabelListDto } from "../data/dto";

export interface ApplicationState {
    labelData: LabelListDto,
    images: AppImageList
}

export interface AppAction<T> {
    type: string,
    payload: T
}