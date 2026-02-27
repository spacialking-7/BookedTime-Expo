import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BadgeDetail() {
  const { badge } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Achievement: {badge}
      </Text>
      <Text style={{ marginTop: 10 }}>
        Details about the {badge} achievement will be shown here.
      </Text>
    </View>
  );
}
