import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function BadgeDetail() {
  const { badge } = useLocalSearchParams();
  return (
    <View>
      <Text>Achievement: {badge}</Text>
    </View>
  );
}