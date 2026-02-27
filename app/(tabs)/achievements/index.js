import { View, Text, StyleSheet } from 'react-native';

export default function AchievementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <Text>Track your milestones here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
});