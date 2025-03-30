import Index from "@/app/(tabs)";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import { TextInput } from "react-native-paper";

export type SegmentedPhoneInputProps = {
  // number: string[];
  // phoneNumber: React.Dispatch<React.SetStateAction<string[]>>;
  onInputFinish: (numberState: string) => void;
  length?: number;
};

const inputs = [...new Array<string>(9).fill("")];

const SegmentedPhoneInput = ({
  onInputFinish,
  length = 9,
}: SegmentedPhoneInputProps) => {
  const [numbers, setNumbers] = useState([
    ...new Array<string>(length).fill(""),
  ]);

  const navigation = useNavigation();

  const inputsRefs = useRef<any[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputsRefs.current[0]?.focus();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 8,
        paddingHorizontal: 16,
      }}
    >
      {numbers.map((item, index) => (
        <TextInput
          autoFocus={index === 0}
          key={index}
          ref={(el: any) => (inputsRefs.current[index] = el)}
          value={numbers[index]}
          contentStyle={{
            padding: 0,
            margin: 0,
          }}
          keyboardType="numeric"
          style={{
            flex: 1,
          }}
          onKeyPress={({ nativeEvent }) => {
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

            const newText =
              text.length > 1
                ? text[0] === currentItem
                  ? text[1]
                  : text[0]
                : text;

            const newNumbers = numbers.map((item, numberIndex) =>
              index == numberIndex ? newText : item
            );

            const isLastNumber = index === numbers.length - 1;

            if (isLastNumber && text !== "") {
              onInputFinish(newNumbers.join(""));
            }

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
