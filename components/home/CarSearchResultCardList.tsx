import { CarListData } from "@/types/home";
import React from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ChipsFilterSection from "../carSearchResult/ChipsFilterSection";

export type CarSearchResultCardList = {
  items: CarListData[];
  renderItem: ListRenderItem<CarListData> | null | undefined;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  stickyHeaderComponent?: React.ComponentType<any> | undefined;
};

const CarSearchResultCardList = ({
  items,
  renderItem,
  hasNextPage,
  isFetching,
  fetchNextPage,
  isLoading,
  stickyHeaderComponent,
}: CarSearchResultCardList) => {
  const loadingComponent = isLoading ? ActivityIndicator : undefined;

  const fetchNextPageIfThereIsNoPreviousOnGoingFetching = () => {
    if (isFetching || !hasNextPage) {
      return;
    }

    fetchNextPage();
  };

  return (
    <View
      style={{
        height: "100%", // take parent height which is also 100% which equal the screen height
      }}
    >
      <FlatList
        StickyHeaderComponent={ChipsFilterSection}
        data={items}
        renderItem={renderItem}
        onEndReached={fetchNextPageIfThereIsNoPreviousOnGoingFetching}
        ListFooterComponent={loadingComponent}
        style={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      ></FlatList>
    </View>
  );
};

export default CarSearchResultCardList;
