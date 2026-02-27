import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function AchievementsScreen() {
  const badges = [
  'First Session (1 session)',
  '1 Hour (60 min)',
  'Big Reader (10h total)',
  'Read-Oholic (50h total)',
  'Marathon Reader (3h session)',

];
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <Text>Track your milestones here.</Text>

      {badges.map((b) => (
        <Link key={b} href={`/achievements/${b}`} asChild>
          <Pressable style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>{b}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 }
});
