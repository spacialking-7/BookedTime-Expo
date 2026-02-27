import { View, Text, StyleSheet, Pressable } from "react-native";
import { Avatar, Card, ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../constants/theme";

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
          <ProgressBar
            progress={Math.min(totalHours / 1, 1)}
            color={theme.colors.primary}
            style={{ marginTop: theme.spacing(1) }}
          />
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
    backgroundColor: theme.colors.background,
    padding: theme.spacing(3),
    alignItems: "center",
  },

  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing(2),
  },

  title: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing(1),
  },

  bio: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },

  card: {
    ...theme.components.card,
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  info: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing(1),
  },

  editButton: {
    ...theme.components.button,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(4),
    marginTop: theme.spacing(3),
  },

  editButtonText: {
    ...theme.typography.body,
    color: theme.colors.buttonText,
    fontWeight: "600",
  },
});