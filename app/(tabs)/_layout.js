import { Tabs, Link } from "expo-router";
import { Pressable, Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: "BookedTime",
        headerRight: () => (
          <Link href="/profile" asChild>
            <Pressable>
              <Text style={{ fontSize: 16 }}>Profile</Text>
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="achievements" options={{ title: "Achievements" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}