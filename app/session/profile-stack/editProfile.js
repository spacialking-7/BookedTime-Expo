import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const colors = {
  primary: "#1E88E5",
  secondary: "#FFC107",
  background: "#F5F5F5",
  card: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#616161",
};

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
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 20,
    fontSize: 16,
    color: colors.textPrimary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});