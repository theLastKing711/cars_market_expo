import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Portal } from "react-native-paper";

export type FullScreenLoadingProps = {
  visible: boolean;
};

const FullScreenLoading = ({ visible }: FullScreenLoadingProps) => {
  return (
    <>
      {visible && (
        <Portal>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10000,
            }}
          >
            <ActivityIndicator size={48} />
          </View>
        </Portal>
      )}
    </>
  );
};

export default FullScreenLoading;
