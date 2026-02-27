import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { theme } from "../../constants/theme";

export default function EditProfile() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem("profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUsername(parsed.username || "");
        setBio(parsed.bio || "");
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const profileData = { username, bio };
    await AsyncStorage.setItem("profile", JSON.stringify(profileData));
    Alert.alert("Saved", "Your profile has been updated.");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Tell us about yourself..."
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Pressable style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing(3),
  },

  title: {
    ...theme.typography.title,
    textAlign: "center",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing(3),
  },

  label: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing(1),
  },

  input: {
    ...theme.components.input,
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing(2.5),
    fontSize: 16,
    color: theme.colors.textPrimary,
  },

  saveButton: {
    ...theme.components.button,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(2),
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing(2),
  },

  saveText: {
    ...theme.typography.body,
    color: theme.colors.buttonText,
    fontWeight: "600",
  },

  cancelButton: {
    paddingVertical: theme.spacing(1.5),
    alignItems: "center",
  },

  cancelText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});