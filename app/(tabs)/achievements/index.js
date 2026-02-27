import { View, Text, StyleSheet,Pressable } from "react-native";
import { Link, Pressable } from "expo-router";

export default function AchievementsScreen() {
  //reading badges
  const badges = [
    "First Session (1 session)",
    "1 Hour (60 min)",
    "Big Reader (10h)",
    "Read-Oholic (50h)",
    "Night Owl (Late night)",
    "Early Bird (Morning read)",
    "Page Turner (100 pages)",
    "Speed Reader (Fast session)",
    "Marathon Reader (3h session)",
    "Bookworm (5 books)",
    "Weekend Warrior (Weekend read)",
    "Consistency King (7-day streak)",
    "Mind Explorer (Challenging book)",
    "Chapter Champ (10 chapters)",
    "Library Legend (100 sessions)",
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
