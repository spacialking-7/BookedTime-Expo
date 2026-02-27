import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BadgeDetail() {
  const { badge } = useLocalSearchParams();
  const badgeDetails = {
      'First Session (1 session)' : 'Congratulations on completing your first reading session! This badge is awarded for completing at least one reading session.',
  '1 Hour (60 min)': 'You’ve read for a total of 60 minutes.',
  'Big Reader (10h total)': 'You’ve accumulated 10 hours of reading time.',
  'Read-Oholic (50h total)': 'You’ve reached 50 hours of reading.',
  'Marathon Reader (3h session)': 'You read for 3 hours straight.',
  };
  

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{badge}</Text>
      <Text style={styles.description}>
        {badgeDetails[badge] || ""}
      </Text>
    </View>
  );
}

const styles = {
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  badgeName: { fontSize: 18, marginBottom: 10 },
  description: { fontSize: 16 }
};
