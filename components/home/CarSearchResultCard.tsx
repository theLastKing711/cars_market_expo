import { getFuelType } from "@/types/enums/FuelType";
import { CarListData } from "@/types/home";
import React from "react";
import { View } from "react-native";
import { Card, IconButton, Text, Tooltip } from "react-native-paper";

export type CardSearchResultProps = {
  item: CarListData;
  onFavourite: (id: number) => void;
};

const CarSearchResultCard = ({
  item: {
    car_import_type,
    car_price,
    id,
    manufacturer_id,
    manufacturer_name,
    miles_travelled_in_km,
    model,
    shippable_to,
    year_manufactured,
    fuel_type,
    is_used,
  },
  onFavourite,
}: CardSearchResultProps) => {
  // const heartIcon = is_favourite ? "heart" : "heart-outline";

  const heartIcon = "heart";

  const title = `${manufacturer_name} ${model} ${year_manufactured}`;

  const is_used_text = is_used ? "مستعملة" : "جديدة";

  const car_price_text = `${car_price} $`;

  const miles_travelled_in_km_text = miles_travelled_in_km
    ? `${miles_travelled_in_km} km`
    : `- km`;

  const fuel_type_text = fuel_type ? getFuelType(fuel_type) : "-";

  return (
    <Card>
      <Card.Cover source={{ uri: "https://picsum.photos/200/300" }} />
      <Card.Title
        title={title}
        titleVariant="titleMedium"
        subtitle={car_price_text}
        subtitleVariant="titleLarge"
      />
      <Card.Content style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, gap: 10 }}>
          <Text>{miles_travelled_in_km_text}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{is_used_text}</Text>
          <Text>{fuel_type_text}</Text>
        </View>
      </Card.Content>
      <Card.Actions style={{ flexDirection: "row-reverse" }}>
        <Tooltip title="أضف إلى عربة التسوق">
          <IconButton icon={{ source: "cart-outline", direction: "rtl" }} />
        </Tooltip>
        <Tooltip title="أضف إلى قائمة المفضلة">
          <IconButton
            icon={{ source: heartIcon, direction: "rtl" }}
            onPress={(e) => onFavourite(id)}
          />
        </Tooltip>
      </Card.Actions>
    </Card>
  );
};

export default CarSearchResultCard;
