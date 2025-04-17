import useLoadingStore from "@/state/useLoadingStore";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Portal, useTheme } from "react-native-paper";

const FullScreenLoading = () => {
  const theme = useTheme();

  const {
    params: { isLoading, isTransparent },
  } = useLoadingStore();

  return (
    <>
      {isLoading && (
        <Portal>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10000,
              backgroundColor: isTransparent
                ? "transparent"
                : theme.colors.surface,
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
