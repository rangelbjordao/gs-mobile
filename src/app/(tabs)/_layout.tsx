"use client";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={24}
      style={{ marginBottom: -4 }}
      name={name}
      color={color}
    />
  );
}

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("@token");
      if (!token) {
        router.replace("/login");
      }
    };
    checkToken();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="index"
            options={{
              title: "Início",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="planejamentoDiario"
            options={{
              title: "Planejar",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="calendar-o" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="metasDiarias"
            options={{
              title: "Metas",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="list-ol" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="estatisticas"
            options={{
              title: "Estatísticas",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="bar-chart" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="perfil"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="user" color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
