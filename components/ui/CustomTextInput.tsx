import React from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { View } from "react-native-reanimated/lib/typescript/Animated";

// export type CustomTextInputProps = {
// control:
// }

const CustomTextInput = () => {
  return (
    <View />
    // <Controller
    //   control={control}
    //   rules={{
    //     required: true,
    //   }}
    //   render={({ field: { onChange, onBlur, value } }) => (
    //     <TextInput
    //       placeholder="First name"
    //       onBlur={onBlur}
    //       onChangeText={onChange}
    //       value={value}
    //     />
    //   )}
    //   name="firstName"
    // />
  );
};

export default CustomTextInput;
