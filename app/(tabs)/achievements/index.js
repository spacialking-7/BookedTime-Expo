import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function AchievementsScreen() {
  const badges = [
    "First Session (1 session)",
    "1 Hour (60 min)",
    "Big Reader (10h total)",
    "Read-Oholic (50h total)",
    "Marathon Reader (3h session)",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <Text style={styles.subtitle}>Track your milestones here.</Text>

      {badges.map((b) => (
        <Link key={b} href={`/achievements/${b}`} asChild>
          <Pressable style={styles.card}>
            <Text style={styles.badgeText}>{b}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#616161",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  badgeText: {
    fontSize: 18,
    fontWeight: "500",
  },
});