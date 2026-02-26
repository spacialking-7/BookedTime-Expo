import { View, Text, StyleSheet } from 'react-native';

export default function SessionIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sessions</Text>
      <Text>Select a session to view details.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
});