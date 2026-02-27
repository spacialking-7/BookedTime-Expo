import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../constants/theme";

export default function HistoryScreen() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      const stored = await AsyncStorage.getItem("sessions");
      const parsed = stored ? JSON.parse(stored) : [];
      setSessions(parsed.reverse());
    };

    loadSessions();
  }, []);

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>History</Text>

      {sessions.length === 0 && (
        <Text style={styles.empty}>No sessions saved yet.</Text>
      )}

      {sessions.map((session) => (
        <View key={session.id} style={styles.card}>
          <Text style={styles.duration}>⏱ {formatDuration(session.duration)}</Text>

          {session.notes ? (
            <Text style={styles.notes}>📝 {session.notes}</Text>
          ) : null}

          <Text style={styles.timestamp}>
            {new Date(session.timestamp).toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(3),
    backgroundColor: theme.colors.background,
  },

  title: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing(2),
  },

  empty: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing(2),
  },

  card: {
    ...theme.components.card,
    marginBottom: theme.spacing(2),
  },

  duration: {
    ...theme.typography.body,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: theme.spacing(1),
    color: theme.colors.textPrimary,
  },

  notes: {
    ...theme.typography.body,
    marginBottom: theme.spacing(1),
    color: theme.colors.textPrimary,
  },

  timestamp: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
});