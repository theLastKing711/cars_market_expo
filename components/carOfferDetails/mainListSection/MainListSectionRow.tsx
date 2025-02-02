import React from "react";
import MainListSectionItem, {
  MainListSectionItemProps,
} from "./MainListSectionItem";
import { View } from "react-native";

// type MainListSectionRowProps = MainListSectionItemProps[];

type MainListSectionRowProps = {
  children: React.ReactNode;
  isLastRow?: boolean;
};

const MainListSectionRow = ({
  children,
  isLastRow = false,
}: MainListSectionRowProps) => {
  const paddingBottom = isLastRow ? 0 : 16;

  return (
    <View style={{ flexDirection: "row", paddingBottom }}>{children}</View>
    // <View style={{ flexDirection: "row" }}>
    //   {items.map((item, index) => (
    //     <MainListSectionItem key={item.label} {...item} />
    //   ))}
    // </View>
  );
};

export default MainListSectionRow;
