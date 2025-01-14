import CarSearchSuggestionList from "@/components/home/CarSearchSuggestionList";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { ListRenderItem, ScrollView, StyleSheet, View } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import { Searchbar } from "react-native-paper";

const Home = () => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    hasNextPage,
    search,
    page,
    car_label_origin,
    car_sell_location,
    faragha_jahzeh,
    fuel_type,
    import_type,
    manufacturer_id,
    miles_travelled_in_km,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    shippable_to,
    user_current_syrian_city,
    user_has_legal_car_papers,
    year_manufactured,
    fetchNextPage,
    onSearchFocus,
    onSearchBlur,
    onSearchValueUpdate,
    onPageValueUpdate,
  } = useGetHomeData();

  const theme = useTheme();

  // //   const { getBackgroundColor, getColor, isItemSelected, toggleItem } =
  // //     useChipFilter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%", // fill the whole screen height
      justifyContent: "center",
      alignItems: "center",
      //   height: 600,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
  });

  const carSearchSuggestions =
    paginatedCarSearchSuggestionData?.pages?.flatMap((item) => item.data) || [];

  //   const categoriesList = data?.data.categories || [];

  //   const mostSellingProducts = data?.data.most_selling_products || [];

  //   const userPurchasedProducts = data?.data.user_purchased_products || [];

  //   console.log("search suggestions", searchSuggestions);

  //   const renderCategoryItem:
  //     | ListRenderItem<IHomeCategoryItem>
  //     | null
  //     | undefined = ({ item }) => (
  //     <Chip
  //       style={{
  //         backgroundColor: getBackgroundColor(item.id),
  //       }}
  //       onPress={(e) => toggleItem(item.id)}
  //       selectedColor={getColor(item.id)}
  //       selected={isItemSelected(item.id)}
  //       key={item.id}
  //     >
  //       {item.name}
  //     </Chip>
  //   );

  //   const renderProductItem:
  //     | ListRenderItem<IHomeProductItem>
  //     | null
  //     | undefined = ({ item }) => (
  //     <ProductCard item={item} onFavourite={favouriteProduct}></ProductCard>
  //   );

  if (isLoading) {
    return;
  }

  //   const shouldShowSuggestionList = isSearchFocused || !!searchQueryParam;

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 4 }}>
        <Searchbar
          style={{ marginTop: 15 }}
          placeholder="ابحث عن منتج"
          onFocus={() => onSearchFocus()}
          onBlur={() => onSearchBlur()}
          value={search}
          onChangeText={onSearchValueUpdate}
        />
      </View>
      {/* <CarSearchSuggestionList
        items={carSearchSuggestions}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      /> */}
    </View>
  );
};

export default Home;
