"use client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
export default function AuthLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("@token");
      setIsLoggedIn(!!token);
      if (token) router.replace("/(tabs)");
    };
    checkToken();
  }, []);
  if (isLoggedIn === null) return null;
  return <Slot />;
}
