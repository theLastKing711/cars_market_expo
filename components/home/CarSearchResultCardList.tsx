import { CarListData } from "@/types/home";
import React from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";

export type CarSearchResultCardList = {
  items: CarListData[];
  renderItem: ListRenderItem<CarListData> | null | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
};

const CarSearchResultCardList = ({
  items,
  renderItem,
  hasNextPage,
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

  console.log("items", items);

  return (
    <View
      style={{
        // position: "absolute",
        height: "100%", // take parent height which is also 100% which equal the screen height
        // width: "100%",
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // top: 71,
        // flex: 1,
        // display: "flex",
        paddingTop: 32,
        // zIndex: 3,
      }}
    >
      <FlatList
        data={items}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        ListFooterComponent={loadingComponent}
        style={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      ></FlatList>
    </View>
  );
};

export default CarSearchResultCardList;
