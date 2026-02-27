import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Avatar, Card, ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = {
  primary: "#1E88E5",
  secondary: "#FFC107",
  background: "#F5F5F5",
  card: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#616161",
};

export default function ProfileMain() {
  const router = useRouter();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      const stored = await AsyncStorage.getItem("sessions");
      const parsed = stored ? JSON.parse(stored) : [];
      setSessions(parsed);
    };
    loadSessions();
  }, []);

  const totalSeconds = sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalSessions = sessions.length;

  const calculateStreak = () => {
    if (!sessions.length) return 0;

    const uniqueDates = [...new Set(
      sessions.map(s => new Date(s.timestamp).toDateString())
    )];

    uniqueDates.sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    const today = new Date().toDateString();

    for (let i = 0; i < uniqueDates.length; i++) {
      const diff = Math.floor(
        (new Date(today) - new Date(uniqueDates[i])) / (1000 * 60 * 60 * 24)
      );
      if (diff === i) streak++;
      else break;
    }

    return streak;
  };

  const streak = calculateStreak();
  const dailyGoalHours = 1;
  const progress = Math.min(totalHours / dailyGoalHours, 1);

  return (
    <View style={styles.container}>
      <Avatar.Icon size={100} icon="account" style={styles.avatar} />

      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.streak}>🔥 Streak: {streak} days</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.info}>Total Reading Time: {totalHours} hrs</Text>
          <Text style={styles.info}>Total Sessions: {totalSessions}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.info}>Daily Goal: {dailyGoalHours} hr</Text>
          <ProgressBar progress={progress} color={colors.primary} style={{ marginTop: 10 }} />
        </Card.Content>
      </Card>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push('/profile-stack/editProfile')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 5,
  },
  streak: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    elevation: 3,
  },
  info: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});