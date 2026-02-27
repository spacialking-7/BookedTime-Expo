import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      const stored = await AsyncStorage.getItem("sessions");
      const parsed = stored ? JSON.parse(stored) : [];
      setSessions(parsed.reverse()); // newest first
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
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1E88E5",
  },
  empty: {
    textAlign: "center",
    color: "#616161",
    fontSize: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  duration: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#212121",
  },
  notes: {
    fontSize: 16,
    marginBottom: 6,
    color: "#424242",
  },
  timestamp: {
    fontSize: 12,
    color: "#757575",
  },
});