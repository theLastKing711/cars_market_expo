import Authentication from "@/components/auth/Authentication";
import MyProfileAuthenticated from "@/components/my-profile/MyProfileAuthenticated";
import { router } from "expo-router";
import React from "react";
import { Divider, List, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const MyProfile = () => {
  const theme = useTheme();

  return <Authentication successPage={<MyProfileAuthenticated />} />;
};

export default MyProfile;
