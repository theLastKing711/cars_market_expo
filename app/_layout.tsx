import useCarSearchStore from "@/state/useCarSearchStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, MD3DarkTheme, PaperProvider } from "react-native-paper";

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
            <Stack.Screen name="/car/[id]" />
            <Stack.Screen
              name="car-search-filter"
              options={{
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
            />
            <Stack.Screen name="car-search-result" />
            <Stack.Screen
              name="car-search-filter-modal"
              options={{
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
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="index" />
          </Stack>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
