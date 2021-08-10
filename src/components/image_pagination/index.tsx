interface ImagePaginationProps {
    currentIdx: number,
    imageArraySize: number,
    onPrevClicked: () => void,
    onNextClicked: () => void
}

export default function ImagePagination(props: ImagePaginationProps) {
    return (
        <>
            <div className="flexitems-center justify-center pa2 f3 f2-m f1-l fw2 black-90">
                <a onClick={props.onPrevClicked}>{"<"}</a>
            </div>
            <div className="flex items-center justify-center pa2 f3 f2-m f1-l fw2 black-90">
                {props.currentIdx + 1}/{props.imageArraySize}
            </div>
            <div className=" flex items-center justify-center pa2 f3 f2-m f1-l fw2 black-90">
                <a onClick={props.onNextClicked}>{">"}</a>
            </div>
        </>
    )
}