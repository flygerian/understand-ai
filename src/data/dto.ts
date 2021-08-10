export type LabelListDto = LabelGroup[]
export type AppImageList = AppImage[]

export interface LabelGroup {
    title: string,
    key: string,
    labels: string[]
    required: boolean
}

export interface AppImage {
    id: number,
    imageUrl: string,
    labels: {
        [key: string]: string
    }
}