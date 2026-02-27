import { View, Text, StyleSheet, Pressable } from "react-native";
import { Avatar, Card, ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [profile, setProfile] = useState({ username: "", bio: "" });

  useEffect(() => {
    const loadData = async () => {
      const storedSessions = await AsyncStorage.getItem("sessions");
      const storedProfile = await AsyncStorage.getItem("profile");

      setSessions(storedSessions ? JSON.parse(storedSessions) : []);
      setProfile(storedProfile ? JSON.parse(storedProfile) : { username: "", bio: "" });
    };

    loadData();
  }, []);

  const totalSeconds = sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalSessions = sessions.length;

  return (
    <View style={styles.container}>
      <Avatar.Icon size={100} icon="account" style={styles.avatar} />

      <Text style={styles.title}>
        {profile.username ? profile.username : "Your Profile"}
      </Text>

      {profile.bio ? (
        <Text style={styles.bio}>{profile.bio}</Text>
      ) : null}

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.info}>Total Reading Time: {totalHours} hrs</Text>
          <Text style={styles.info}>Total Sessions: {totalSessions}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.info}>Daily Goal: 1 hr</Text>
          <ProgressBar progress={Math.min(totalHours / 1, 1)} color={colors.primary} style={{ marginTop: 10 }} />
        </Card.Content>
      </Card>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push("/session/(modals)/editProfile")}
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
  bio: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: "center",
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
    paddingVertical: 14,
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