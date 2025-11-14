import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
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
            name="estatisticas"
            options={{
              title: "Estatísticas",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="bar-chart" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="tela4"
            options={{
              title: "Tela 4",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="file" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="tela5"
            options={{
              title: "Tela 5",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="file" color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
