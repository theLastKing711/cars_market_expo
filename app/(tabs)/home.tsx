import CarSearchFilterModal from "@/components/home/CarSearchFilterModal";
import CarSearchResultCard from "@/components/home/CarSearchResultCard";
import CarSearchResultCardList from "@/components/home/CarSearchResultCardList";
import CarSearchSuggestionList from "@/components/home/CarSearchSuggestionList";
import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { router } from "expo-router";
import { useState } from "react";
import { ListRenderItem, ScrollView, StyleSheet, View } from "react-native";
import { Chip, Searchbar, useTheme } from "react-native-paper";

const Home = () => {
  const {
    data: paginatedCarSearchSuggestionData,
    isLoading,
    hasNextPage,
    search,
    page,
    car_label_origin,
    car_sell_location,
    fuel_type,
    import_type,
    manufacturer_id,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    shippable_to,
    user_current_syrian_city,
    user_has_legal_car_papers,
    year_manufactured,
    searchState,
    updateSearchStateItem,
    fetchNextPage,
    onSearchFocus,
    onSearchBlur,
    onSearchValueUpdate,
    onPageValueUpdate,
  } = useGetHomeData();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const theme = useTheme();

  // //   const { getBackgroundColor, getColor, isItemSelected, toggleItem } =
  // //     useChipFilter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // height: "100%", // fill the whole screen height
      // justifyContent: "center",
      // alignItems: "center",
      //   height: 600,
      paddingTop: 71,
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

  const goToCarSearchFilterPage = () => {
    router.push({ pathname: "/car-search-filter" });
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16 }}>
        <Searchbar
          placeholder="ابحث عن سيارة"
          onFocus={() => onSearchFocus()}
          onBlur={() => onSearchBlur()}
          value={search}
          onChangeText={onSearchValueUpdate}
          onPress={goToCarSearchFilterPage}
        />
      </View>
      <CarSearchResultCardList
        items={carSearchSuggestions}
        renderItem={({ item }) => (
          <CarSearchResultCard item={item} onFavourite={() => {}} />
        )}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      />
      {/* <CarSearchFilterModal
        isVisible={isFilterModalOpen}
        onFilter={() => {}}
        onSearchButtonClicked={() => {}}
        searchData={searchState}
        updateSearchData={updateSearchStateItem}
      /> */}
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
