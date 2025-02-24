import { useGetHomeData } from "@/hooks/api/home/Queries/useGetHomeData";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, FAB, Searchbar, Text, useTheme } from "react-native-paper";
import {
  PhoneNumberInput,
  getCountryByCode,
} from "react-native-paper-phone-number-input";
import PhoneInput from "@navid73/react-native-phone-number-input-rtl";
import SegmentedPhoneInput from "@/components/ui/SegmentedPhoneInput";
const Home = () => {
  const [value, setValue] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [countryCode, setCountryCode] = useState<string>("SY"); // Default country code
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const { isLoading, search, fetchNextPage } = useGetHomeData();

  const theme = useTheme();

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
      <SegmentedPhoneInput />
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="DM"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        withDarkTheme
        withShadow
        autoFocus={false}
      />
      <PhoneNumberInput
        // textAlign="right"
        code="SY"
        setCode={setCountryCode}
        phoneNumber={phoneNumber}
        setPhoneNumber={(value) => setPhoneNumber(value)}
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
