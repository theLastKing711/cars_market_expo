import React from "react";
import { Modal } from "react-native";
import FullScreenCarousel, {
  FullScreenCarouselProps,
} from "../carOfferDetails/FullScreenCarousel";

export type FullScreenImageViewerModalProps = {
  isVisible: boolean;
  images: FullScreenCarouselProps["images"];
  onCloseButtonClicked: FullScreenCarouselProps["onCloseButtonClicked"];
  onDeleteButtonClicked?: FullScreenCarouselProps["onDeleteButtonClicked"];
  withDelete?: FullScreenCarouselProps["withDelete"];
  onModalClose: () => void;
};

const FullScreenImageViewerModal = ({
  isVisible,
  images,
  withDelete = true,
  onCloseButtonClicked,
  onDeleteButtonClicked = () => {},
  onModalClose,
}: FullScreenImageViewerModalProps) => {
  return (
    <Modal // is position absolute at root with top,left,right and bottom set at 0
      animationType="slide"
      // transparent={true}
      visible={isVisible}
      onRequestClose={onModalClose}
      style={{ backgroundColor: "red" }}
    >
      <FullScreenCarousel
        images={images}
        withDelete={withDelete}
        onCloseButtonClicked={onCloseButtonClicked}
        onDeleteButtonClicked={onDeleteButtonClicked}
      />
    </Modal>
  );
};

export default FullScreenImageViewerModal;
