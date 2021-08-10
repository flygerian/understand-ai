import { AppImage, LabelListDto } from "../../data/dto";
import LabelsList from "../labels_list";

interface LabelCategoriesProps {
    labelData: LabelListDto,
    currentImage: AppImage,
    selectionMade: (key: string, label: string) => void
}

export default function LabelCategories(props: LabelCategoriesProps) {
    return (
        <>
            {
                props.labelData.map(label => {
                    return (
                        <LabelsList
                            key={label.key}
                            inputFieldLabel={label.title}
                            labelsToPickFrom={label.labels}
                            required={label.required}
                            currentlySelectedLabel={props.currentImage.labels[label.key]}
                            onLabelSelected={selectedLabel => props.selectionMade(label.key, selectedLabel)} />
                    )
                })
            }
        </>
    )
}