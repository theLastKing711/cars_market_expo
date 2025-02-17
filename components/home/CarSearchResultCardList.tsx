import { CarListData } from "@/types/home";
import React from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ActivityIndicator, List, Text } from "react-native-paper";
import ChipsFilterSection from "../carSearchResult/ChipsFilterSection";

export type CarSearchResultCardList = {
  items: CarListData[];
  renderItem: ListRenderItem<CarListData> | null | undefined;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
};

const CarSearchResultCardList = ({
  items,
  renderItem,
  hasNextPage,
  isFetching,
  fetchNextPage,
  isLoading,
}: CarSearchResultCardList) => {
  //   const renderItem: ListRenderItem<CarListData> | null | undefined = ({
  //     item: {
  //       id,
  //       car_import_type,
  //       car_price,
  //       manufacturer_id,
  //       manufacturer_name,
  //       miles_travelled_in_km,
  //       model,
  //       shippable_to,
  //       year_manufactured,
  //     },
  //   }) => (
  //     <View key={id} style={{ gap: 15 }}>
  //       {/* <Image
  //           source={{ uri: image_url }}
  //           style={{
  //             borderRadius: 100,
  //           }}
  //         ></Image>
  //         <View>
  //           <Text variant="labelMedium">{name}</Text>
  //         </View> */}
  //       <List.Item
  //         onPress={() => alert("hello world")}
  //         title={manufacturer_name}
  //         description="Item description"
  //         left={(props) => <List.Icon {...props} icon="folder" />}
  //       />
  //     </View>
  //   );

  const loadingComponent = isLoading ? ActivityIndicator : undefined;

  // console.log("items", items);

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
