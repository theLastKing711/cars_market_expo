import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function RootLayout() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="/car/[id]" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="index" />
        </Stack>
      </QueryClientProvider>
    </PaperProvider>
  );
}
