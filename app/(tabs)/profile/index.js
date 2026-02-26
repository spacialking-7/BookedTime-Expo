import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text>Dark Mode</Text>
      <Switch value={darkMode} onValueChange={setDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
});