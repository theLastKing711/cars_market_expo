import { useFavouriteCar } from "@/hooks/api/car/mutations/useFavouriteCar";
import { FUELTYPELOOKUP } from "@/types/enums/FuelType";
import { SYRIANCITYLOOKUP } from "@/types/enums/SyrianCity";
import { CarListData } from "@/types/home";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, Tooltip } from "react-native-paper";

export type CardSearchResultProps = {
  item: CarListData;
  // onFavourite: (id: number) => void;
  onPress?: (id: number) => void;
  actions?: React.ReactNode;
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
    gap: 12,
  },
});

const CarSearchResultCard = ({
  item: {
    // car_import_type,
    car_price,
    id,
    name_ar,
    miles_travelled_in_km,
    fuel_type,
    car_sell_location,
    is_kassah,
    is_khalyeh,
    is_faragha_jahzeh,
    is_new_car,
    image,
    is_favourite,
  },
  onPress,
  actions,
}: CardSearchResultProps) => {
  const { favouriteCar } = useFavouriteCar(id);

  const heartIcon = is_favourite ? "heart" : "heart-outline";

  // const heartIcon = "heart";

  const is_new_car_text = is_new_car ? " جديدة" : " مستعملة";

  const title = `${name_ar}${is_new_car_text}`;

  const car_price_text = `${car_price}$`;

  const miles_travelled_in_km_text = miles_travelled_in_km
    ? `قاطعة ${miles_travelled_in_km} (كيلومتر)`
    : `- km `;

  const fuel_type_text = fuel_type ? FUELTYPELOOKUP(fuel_type) : "-";

  const car_sell_location_text = car_sell_location
    ? `تواجد ${SYRIANCITYLOOKUP(car_sell_location)}`
    : "-";

  const is_kassah_text =
    is_kassah == null ? "-" : is_kassah == true ? "قصة" : "غير مقصوصة";

  const is_khalyeh_text =
    is_kassah == null
      ? "-"
      : is_khalyeh == true
      ? "خالية العلام"
      : "غير خالية العلام";

  const is_is_faragha_jahzeh_text =
    is_faragha_jahzeh == null
      ? "-"
      : is_faragha_jahzeh
      ? "جاهزة عالفراغة"
      : "-";

  return (
    <Card
      onPress={() => {
        onPress
          ? onPress(id)
          : router.push({
              pathname: "/car/[id]",
              params: {
                id,
              },
            });
      }}
    >
      <Card.Cover
        source={{ uri: image?.file_url }}
        resizeMode="contain"
        style={{ height: 300 }}
      />
      <Card.Title
        title={title}
        titleVariant="titleMedium"
        subtitle={car_price_text}
        subtitleVariant="headlineMedium"
        style={styles.titleContainer}
        titleStyle={styles.title}
        titleNumberOfLines={2}
      />
      <Card.Content style={styles.contentContainer}>
        <View style={styles.contentColumn}>
          <Text>{car_sell_location_text}</Text>
          <Text>{miles_travelled_in_km_text}</Text>
          <Text>{is_khalyeh_text}</Text>
        </View>
        <View style={styles.contentColumn}>
          <Text>{is_is_faragha_jahzeh_text}</Text>
          <Text>{fuel_type_text}</Text>
          <Text>{is_kassah_text}</Text>
        </View>
      </Card.Content>
      <Card.Actions
        style={{
          flexDirection: "column",
          paddingTop: 16,
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {/* <Tooltip title="أضف إلى عربة التسوق">
          <IconButton icon={{ source: "cart-outline", direction: "rtl" }} />
        </Tooltip> */}
        {
          <Tooltip title="أضف إلى قائمة المفضلة">
            <IconButton
              icon={{ source: heartIcon, direction: "rtl" }}
              onPress={(e) => favouriteCar()}
            />
          </Tooltip>
        }
        {actions}
      </Card.Actions>
    </Card>
  );
};

export default CarSearchResultCard;
