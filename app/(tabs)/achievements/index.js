import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AchievementsScreen() {
  // Milestones based on total reading time
  const achievementMilestones = [
    { id: "10min", label: "10 Minutes", requiredSeconds: 10 * 60 },
    { id: "30min", label: "30 Minutes", requiredSeconds: 30 * 60 },
    { id: "1h", label: "1 Hour", requiredSeconds: 60 * 60 },
    { id: "2h", label: "2 Hours", requiredSeconds: 2 * 60 * 60 },
    { id: "5h", label: "5 Hours", requiredSeconds: 5 * 60 * 60 },
    { id: "10h", label: "10 Hours", requiredSeconds: 10 * 60 * 60 },
  ];

  const [totalSeconds, setTotalSeconds] = useState(0);

  // Load total reading time from saved sessions
  useEffect(() => {
    const loadTotal = async () => {
      const stored = await AsyncStorage.getItem("sessions");
      const sessions = stored ? JSON.parse(stored) : [];

      const total = sessions.reduce((sum, s) => sum + s.duration, 0);
      setTotalSeconds(total);
    };

    loadTotal();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <Text style={styles.subtitle}>Track your milestones here.</Text>

      {achievementMilestones.map((a) => {
        const isUnlocked = totalSeconds >= a.requiredSeconds;

        return (
          <View
            key={a.id}
            style={[
              styles.card,
              { opacity: isUnlocked ? 1 : 0.4 } // dim locked ones
            ]}
          >
            <Text style={styles.badgeText}>
              {isUnlocked ? "🏆" : "🔒"} {a.label}
            </Text>
          </View>
        );
      })}
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