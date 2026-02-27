import { Stack } from 'expo-router';

export default function AchievementsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[badge]" options={{ title: 'Achievement' }} />
    </Stack>
  );
}