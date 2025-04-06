import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        // tabBarStyle: Platform.select({
        //   ios: {
        //     // Use a transparent background on iOS to show the blur effect
        //     position: "absolute",
        //   },
        //   default: {},
        // }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="search-my-favourite-cars"
        options={{
          title: "المفضلة",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="heart" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-car-offer"
        options={{
          title: "إنشاء عرض",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="add" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="search-my-cars"
        options={{
          title: "سياراتي",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="car" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="my-profile"
        options={{
          title: "حسابي",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
