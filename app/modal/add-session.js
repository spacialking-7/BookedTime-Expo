import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function AddSessionModal() {
  const [minutes, setMinutes] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Session</Text>

      <TextInput
        placeholder="Minutes read"
        value={minutes}
        onChangeText={setMinutes}
        style={styles.input}
      />

      <Button title="Save Session" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 }
});