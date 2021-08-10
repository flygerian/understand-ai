import LabelList from "./components/labels_list"
import './App.css';

import 'antd/dist/antd.css';
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "./state/interfaces";
import React, { Dispatch, useEffect, useState } from "react";
import { labelSelectedAction, loadImagesAction, loadLabelsAction, saveImageAndLabelsAction } from "./components/labels_list/actions";
import { AppImage, AppImageList, LabelListDto } from "./data/dto";

function App() {
  const dispatch = useDispatch()

  const labelData = useSelector<ApplicationState>(state => state.labelData) as LabelListDto
  const images = useSelector<ApplicationState>(state => state.images) as AppImageList

  let [currentImageIdx, setCurrentImageIdx] = useState(0)

  useEffect(() => {
    dispatch(loadLabelsAction())
    dispatch(loadImagesAction())
  }, [])

  const imageToRender = images[currentImageIdx]
  return (
    <div className="vh-100 flex items-center justify-center">
      <div className="flex items-center justify-center h-100 w-100 bg-black">
        {imageToRender ? <img src={imageToRender.imageUrl} alt="" className="h-100" /> : <div>No image to render</div>}
      </div>
      <div className="overlay flex flex-row w-100">
        <div className="input-area w-20 pa3">
          <div className="h-90">
            {renderLabelCategories(labelData, imageToRender, onLabelSelectionMade(dispatch, imageToRender))}
          </div>
          <div className="h-10 flex flex-row items-center justify-center">
            {
              renderPaginationSelectors(
                currentImageIdx,
                images.length,
                onPrevClicked(currentImageIdx, setCurrentImageIdx),
                onNextClicked(currentImageIdx, images, labelData, setCurrentImageIdx, dispatch)
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function onLabelSelectionMade(dispatch: Dispatch<any>, imageToRender: AppImage): (key: string, label: string) => void {
  return (key, label) => {
    dispatch(
      labelSelectedAction(imageToRender.id, key, label)
    );
  };
}

function onPrevClicked(currentImageIdx: number, setCurrentImageIdx: React.Dispatch<React.SetStateAction<number>>) {
  return () => { if (currentImageIdx > 0) setCurrentImageIdx(--currentImageIdx) }
}

function onNextClicked(
  currentImageIdx: number,
  images: AppImageList,
  labelData: LabelListDto,
  setCurrentImageIdx: React.Dispatch<React.SetStateAction<number>>,
  dispatch: Dispatch<any>) {

  return () => {
    const currentImage = images[currentImageIdx]
    const currentImageLabelKeys = Object.keys(currentImage.labels)

    const requiredKeys = labelData
      .filter(l => l.required)
      .map(l => l.key)

    const requiredKeysFilled = currentImageLabelKeys.filter(key => requiredKeys.includes(key))

    if (requiredKeysFilled.length < requiredKeys.length) {
      alert("Please fill required fields before going to next image")
      return
    }

    dispatch(saveImageAndLabelsAction(currentImage))

    if (currentImageIdx < images.length - 1) setCurrentImageIdx(++currentImageIdx)
  }
}

function renderLabelCategories(labelData: LabelListDto, currentImage: AppImage, selectionMade: (key: string, label: string) => void) {
  return labelData.map(label => {
    return (
      <LabelList
        key={label.key}
        inputFieldLabel={label.title}
        labelsToPickFrom={label.labels}
        required={label.required}
        currentlySelectedLabel={currentImage.labels[label.key]}
        onLabelSelected={selectedLabel => selectionMade(label.key, selectedLabel)} />
    )
  })
}

function renderPaginationSelectors(
  currentIdx: number,
  imageArraySize: number,
  onPrevClicked: () => void,
  onNextClicked: () => void
) {
  return (
    <>
      <div className="flexitems-center justify-center pa2 f3 f2-m f1-l fw2 black-90">
        <a onClick={onPrevClicked}>{"<"}</a>
      </div>
      <div className="flex items-center justify-center pa2 f3 f2-m f1-l fw2 black-90">
        {currentIdx + 1}/{imageArraySize}
      </div>
      <div className=" flex items-center justify-center pa2 f3 f2-m f1-l fw2 black-90">
        <a onClick={onNextClicked}>{">"}</a>
      </div>
    </>
  )
}

export default App;
