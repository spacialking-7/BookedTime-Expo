import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="achievements/index" />
      <Stack.Screen name="session/index" />
      <Stack.Screen name="session/[id]" />
      <Stack.Screen name="modal/add-session" options={{ presentation: 'modal' }} />
    </Stack>
  );
}