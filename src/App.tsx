import './App.css';

import 'antd/dist/antd.css';
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "./state/interfaces";
import React, { Dispatch, useEffect, useState } from "react";
import { labelSelectedAction, loadImagesAction, loadLabelsAction, saveImageAndLabelsAction } from "./components/labels_list/actions";
import { AppImage, AppImageList, LabelListDto } from "./data/dto";
import LabelCategories from "./components/label_categories";
import ImagePagination from "./components/image_pagination";

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
            <LabelCategories
              labelData={labelData}
              currentImage={imageToRender}
              selectionMade={onLabelSelectionMade(dispatch, imageToRender)} />
          </div>
          <div className="h-10 flex flex-row items-center justify-center">
            <ImagePagination
              currentIdx={currentImageIdx}
              imageArraySize={images.length}
              onPrevClicked={onPrevClicked(currentImageIdx, setCurrentImageIdx)}
              onNextClicked={onNextClicked(currentImageIdx, images, labelData, setCurrentImageIdx, dispatch)} />
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

export default App;
