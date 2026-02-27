import { View, Text, StyleSheet, ScrollView } from 'react-native';
//testing modal (import)
import { Link } from "expo-router";



export default function HistoryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text>Your past reading sessions will appear here.</Text>
      
      <Link href="/(modals)/info">Open Modal</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
});