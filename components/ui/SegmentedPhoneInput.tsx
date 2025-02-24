import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const inputs = [...new Array<string>(9).fill("")];

const SegmentedPhoneInput = () => {
  const [numbers, setNumbers] = useState(inputs);

  const inputsRefs = useRef<any[]>([]);

  useEffect(() => {
    inputsRefs.current[0].focus();
  }, []);

  return (
    <View
      style={{
        // backgroundColor: "red",
        flexDirection: "row-reverse",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 8,
        paddingHorizontal: 16,
      }}
    >
      {numbers.map((item, index) => (
        <TextInput
          ref={(el) => (inputsRefs.current[index] = el)}
          value={numbers[index]}
          keyboardType="numeric"
          style={{
            // width: 40,
            flex: 1,
            // width: 40,
            // fontSize: 28,
          }}
          onKeyPress={({ nativeEvent }) => {
            console.log("numbers", numbers);
            if (nativeEvent.key === "Backspace") {
              const newNumbers = numbers.map((item, numberIndex) =>
                index == numberIndex ? "" : item
              );

              setNumbers(newNumbers);

              const previous = inputsRefs.current[index - 1];

              if (previous) {
                const currentItem = numbers.find((item, i) => i === index)!;

                if (currentItem === "") {
                  const newNumbers = numbers.map((item, numberIndex) =>
                    index - 1 == numberIndex ? "" : item
                  );

                  setNumbers((old) => newNumbers);
                }

                previous.focus();
              }
            }
          }}
          onChangeText={(text) => {
            const currentItem = numbers.find((item, i) => i === index)!;

            const newText = text.length > 1 ? text[0] : text;

            const newNumbers = numbers.map((item, numberIndex) =>
              index == numberIndex ? newText : item
            );

            setNumbers(newNumbers);

            const next = inputsRefs.current[index + 1];
            if (next && text !== "") {
              next.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

export default SegmentedPhoneInput;
