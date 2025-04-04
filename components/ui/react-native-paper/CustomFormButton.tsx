import React from "react";
import { Button, ButtonProps } from "react-native-paper";

const CustomFormButton = (props: ButtonProps) => {
  return (
    <Button
      mode="contained"
      {...props}
      style={{
        paddingVertical: 4,
        borderRadius: 1000000,
        ...props.style,
        // marginTop: 16,
        // marginBottom: 16,
      }}
    >
      {props.children}
    </Button>
  );
};

export default CustomFormButton;
