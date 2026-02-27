import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../constants/theme";

const screenWidth = Dimensions.get("window").width;

export default function AchievementsScreen() {
  const achievementMilestones = [
    { id: "10min", label: "10 Minutes", requiredSeconds: 10 * 60 },
    { id: "30min", label: "30 Minutes", requiredSeconds: 30 * 60 },
    { id: "1h", label: "1 Hour", requiredSeconds: 60 * 60 },
    { id: "2h", label: "2 Hours", requiredSeconds: 2 * 60 * 60 },
    { id: "5h", label: "5 Hours", requiredSeconds: 5 * 60 * 60 },
    { id: "10h", label: "10 Hours", requiredSeconds: 10 * 60 * 60 },
  ];

  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    const loadTotal = async () => {
      const stored = await AsyncStorage.getItem("sessions");
      const sessions = stored ? JSON.parse(stored) : [];
      const total = sessions.reduce((sum, s) => sum + s.duration, 0);
      setTotalSeconds(total);
    };

    loadTotal();
  }, []);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const badgeRows = chunkArray(achievementMilestones, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <Text style={styles.subtitle}>Track your milestones here.</Text>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {badgeRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((a) => {
              const isUnlocked = totalSeconds >= a.requiredSeconds;

              return (
                <View
                  key={a.id}
                  style={[
                    styles.card,
                    { opacity: isUnlocked ? 1 : 0.4 },
                  ]}
                >
                  <Text style={styles.badgeIcon}>
                    {isUnlocked ? "🏆" : "🔒"}
                  </Text>
                  <Text style={styles.label}>{a.label}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing(5),
    backgroundColor: theme.colors.background,
  },

  title: {
    ...theme.typography.title,
    textAlign: "center",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing(1),
  },

  subtitle: {
    ...theme.typography.body,
    textAlign: "center",
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing(4),
  },

  rowContainer: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: screenWidth / 3.5,
    marginHorizontal: theme.spacing(1),
    paddingVertical: theme.spacing(4),
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    ...theme.shadow.card,
  },

  badgeIcon: {
    fontSize: 32,
    marginBottom: theme.spacing(1),
  },

  label: {
    ...theme.typography.body,
    fontWeight: "600",
    textAlign: "center",
    color: theme.colors.textPrimary,
  },
});