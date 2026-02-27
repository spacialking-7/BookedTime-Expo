import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function InfoModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a modal</Text>

      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 }
});