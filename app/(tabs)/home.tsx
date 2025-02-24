import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, FAB, Searchbar, Text, useTheme } from "react-native-paper";

import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
import { useState } from "react";

const inputs = [...new Array<string>(9).fill("")];

const Home = () => {
  const { isLoading, search, fetchNextPage } = useGetHomeData();

  const theme = useTheme();

  const [phoneNumber, setPhoneNumber] = useState(inputs);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 71,
      backgroundColor: theme.colors.surface,
      position: "relative",
    },
  });

  if (isLoading) {
    return;
  }

  const goToCarSearchFilterPage = () => {
    router.push({ pathname: "/car-search-filter" });
  };

  return (
    <View style={styles.container}>
      <SegmentedPhoneInput
        onInputFinish={(numbers) => {
          alert(numbers);
        }}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Searchbar
          placeholder="ابحث عن سيارة"
          value={search}
          onPress={goToCarSearchFilterPage}
        />
        <Button icon="search">aslkj</Button>
        <FAB
          icon="search1"
          label="ابحث عن سيارة"
          onPress={goToCarSearchFilterPage}
        ></FAB>
      </View>
    </View>
  );
};

export default Home;
