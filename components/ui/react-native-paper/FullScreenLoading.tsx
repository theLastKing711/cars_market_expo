import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Portal, useTheme } from "react-native-paper";

export type FullScreenLoadingProps = {
  visible: boolean;
};

const FullScreenLoading = ({ visible }: FullScreenLoadingProps) => {
  const theme = useTheme();

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
              // backgroundColor: theme.colors.surface,
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
