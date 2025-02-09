import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

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
  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="/car/[id]" />
            <Stack.Screen name="car-search-result" />
            <Stack.Screen name="car-search-filter" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="index" />
          </Stack>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
