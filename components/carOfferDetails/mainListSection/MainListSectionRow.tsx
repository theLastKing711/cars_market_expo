import React from "react";
import MainListSectionItem, {
  MainListSectionItemProps,
} from "./MainListSectionItem";
import { View } from "react-native";

// type MainListSectionRowProps = MainListSectionItemProps[];

type MainListSectionRowProps = {
  children: React.ReactNode;
};

const MainListSectionRow = ({ children }: MainListSectionRowProps) => {
  return (
    <View style={{ flexDirection: "row" }}>{children}</View>
    // <View style={{ flexDirection: "row" }}>
    //   {items.map((item, index) => (
    //     <MainListSectionItem key={item.label} {...item} />
    //   ))}
    // </View>
  );
};

export default MainListSectionRow;
