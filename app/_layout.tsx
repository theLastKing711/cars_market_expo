import useCarSearchStore from "@/state/useCarSearchStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, MD3DarkTheme, PaperProvider } from "react-native-paper";
import React from "react";
import { useInitializeAccessToken } from "@/state/useInitializeAccessToken";
import CustomSnackBar from "@/components/ui/react-native-paper/CustomSnackBar";
import FullScreenLoading from "@/components/ui/react-native-paper/FullScreenLoading";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default function RootLayout() {
  const darkTheme = { ...MD3DarkTheme };

  const { resetAllFilters } = useCarSearchStore();

  useInitializeAccessToken();

  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: darkTheme.colors.surface,
              },
              headerBackTitle: "الرجوع",
              headerTitleStyle: {
                color: darkTheme.colors.onSurface,
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* 
            <Stack.Screen
              name="car-search-filter"
              options={{
                title: "البحث والفلترة",
                headerRight: (prosp) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button icon="trash-can" onPress={resetAllFilters}>
                      إلغاء الفلاتر
                    </Button>
                  </View>
                ),
              }}
            /> */}
            <Stack.Screen name="car-search-result" />

            <Stack.Screen
              name="car-search-filter-modal"
              options={{
                title: "البحث والفلترة",
                headerRight: (prosp) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button icon="trash-can" onPress={resetAllFilters}>
                      إلغاء الفلاتر
                    </Button>
                  </View>
                ),
                headerBackTitle: "الرجوع",
              }}
            />
            <Stack.Screen
              name="car/[id]"
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="verify-password/[phone_number]"
              options={{
                title: "تسجيل الدخول",
              }}
            />
            <Stack.Screen
              name="car/update/[id]"
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="change-phone-number"
              options={{
                title: "تغيير رقم الهاتف",
              }}
            />
            <Stack.Screen
              name="change-password"
              options={{
                title: "تغيير كلمة المرور",
              }}
            />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="home" />
          </Stack>
          <CustomSnackBar />
          <FullScreenLoading />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
