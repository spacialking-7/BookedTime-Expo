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
        <Text>No sessions saved yet.</Text>
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
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  duration: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  notes: { fontSize: 16, marginBottom: 4 },
  timestamp: { fontSize: 12, color: "#666" },
});