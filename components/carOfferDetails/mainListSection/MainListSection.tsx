import React from "react";
import { SectionContainer } from "../SectionContainer";
import MainListSectionRow from "./MainListSectionRow";
import MainListSectionItem, {
  MainListSectionItemProps,
} from "./MainListSectionItem";
import { rowPartition } from "@/libs/axios/helpers";

export type MainListSectionProps = {
  items: MainListSectionItemProps[];
};

const MainListSection = ({ items }: MainListSectionProps) => {
  const { rowPartitionedItems, isLastRow } = rowPartition(items, 2);

  return (
    <SectionContainer>
      {rowPartitionedItems.map((row, index) => (
        <MainListSectionRow key={index} isLastRow={isLastRow(index)}>
          {row.map((item, itemIndex) => (
            <MainListSectionItem
              key={index + itemIndex}
              icon={item.icon}
              label={item.label}
              text={item.text}
            />
          ))}
        </MainListSectionRow>
      ))}
    </SectionContainer>
  );
};

export default MainListSection;
