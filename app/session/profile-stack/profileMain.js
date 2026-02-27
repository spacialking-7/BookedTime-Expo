import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileMain() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Edit Profile" onPress={() => router.push('EditProfile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});