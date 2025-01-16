import { FUELTYPELOOKUP } from "@/types/enums/FuelType";
import { SYRIANCITYLOOKUP } from "@/types/enums/SyrianCity";
import { CarListData } from "@/types/home";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, Tooltip } from "react-native-paper";

export type CardSearchResultProps = {
  item: CarListData;
  onFavourite: (id: number) => void;
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingBottom: 16,
  },
  title: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  subtitle: {
    paddingBottom: 16,
  },
  contentContainer: {
    flexDirection: "row",
  },
  contentColumn: {
    flex: 1,
    gap: 8,
  },
});

const CarSearchResultCard = ({
  item: {
    car_import_type,
    car_price,
    id,
    manufacturer_id,
    manufacturer_name,
    miles_travelled_in_km,
    model,
    year_manufactured,
    fuel_type,
    is_used,
    car_sell_location,
    is_kassah,
    is_khalyeh,
    is_faragha_jahzeh,
    shippable_to,
  },
  onFavourite,
}: CardSearchResultProps) => {
  // const heartIcon = is_favourite ? "heart" : "heart-outline";

  const heartIcon = "heart";

  const title = `${manufacturer_name} ${model} ${year_manufactured}`;

  const is_used_text = is_used ? "مستعملة" : "جديدة";

  const car_price_text = `${car_price} $`;

  const miles_travelled_in_km_text = miles_travelled_in_km
    ? `${miles_travelled_in_km} km قاطعة`
    : `- km `;

  const fuel_type_text = fuel_type ? FUELTYPELOOKUP[fuel_type] : "-";

  const car_sell_location_text = car_sell_location
    ? `تواجد ${SYRIANCITYLOOKUP[car_sell_location]}`
    : "-";

  const is_kassah_text =
    is_kassah == null ? "-" : is_kassah == false ? "قصة" : "نظامية)بدون قص)";

  const is_khalyeh_text =
    is_kassah == null
      ? "-"
      : is_khalyeh == false
      ? "خالية العلام"
      : "غير خالية العلام";

  const is_is_faragha_jahzeh_text =
    is_faragha_jahzeh == null
      ? "-"
      : is_faragha_jahzeh
      ? "جاهزة عالفراغة"
      : "-";
  return (
    <Card>
      <Card.Cover source={{ uri: "https://picsum.photos/200/300" }} />
      <Card.Title
        title={title}
        titleVariant="titleLarge"
        subtitle={car_price_text}
        subtitleVariant="headlineLarge"
        style={styles.titleContainer}
        titleStyle={styles.title}
      />
      <Card.Content style={styles.contentContainer}>
        <View style={styles.contentColumn}>
          <Text variant="bodyLarge">{car_sell_location_text}</Text>
          <Text variant="bodyLarge">{miles_travelled_in_km_text}</Text>
          <Text variant="bodyLarge">{is_khalyeh_text}</Text>
        </View>
        <View style={styles.contentColumn}>
          <Text variant="bodyLarge">{is_used_text}</Text>
          <Text>{is_is_faragha_jahzeh_text}</Text>
          <Text variant="bodyLarge">{fuel_type_text}</Text>
          <Text variant="bodyLarge">{is_kassah_text}</Text>
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
