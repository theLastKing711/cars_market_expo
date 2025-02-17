import React from "react";
import { Modal } from "react-native";
import FullScreenCarousel, {
  FullScreenCarouselProps,
} from "../carOfferDetails/FullScreenCarousel";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

export type FullScreenImageViewerModalProps = {
  isVisible: boolean;
  images: FullScreenCarouselProps["images"];
  onCloseButtonClicked: FullScreenCarouselProps["onCloseButtonClicked"];
  onDeleteButtonClicked: FullScreenCarouselProps["onDeleteButtonClicked"];
  onModalClose: () => void;
};

const FullScreenImageViewerModal = ({
  isVisible,
  images,
  onCloseButtonClicked,
  onDeleteButtonClicked,
  onModalClose,
}: FullScreenImageViewerModalProps) => {
  return (
    <Modal // is position absolute at root with top,left,right and bottom set at 0
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onModalClose}
      style={{ backgroundColor: "red" }}
    >
      <ReactNativeZoomableView minZoom={1}>
        <FullScreenCarousel
          images={images}
          onCloseButtonClicked={onCloseButtonClicked}
          onDeleteButtonClicked={onDeleteButtonClicked}
        />
      </ReactNativeZoomableView>
    </Modal>
  );
};

export default FullScreenImageViewerModal;
