import React from "react";
import { SectionContainer } from "../SectionContainer";
import MainListSectionRow from "./MainListSectionRow";
import MainListSectionItem, {
  MainListSectionItemProps,
} from "./MainListSectionItem";

export type MainListSectionProps = {
  items: MainListSectionItemProps[];
};

const MainListSection = ({ items }: MainListSectionProps) => {
  const rowPartitionedItems = items.reduce((prev, current, index) => {
    if (index % 2 == 0) {
      prev.push([]);
    }

    prev[Math.floor(index / 2)].push(current);

    return prev;
  }, [] as MainListSectionItemProps[][]);

  return (
    <SectionContainer>
      {rowPartitionedItems.map((row, index) => (
        <MainListSectionRow key={index}>
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
