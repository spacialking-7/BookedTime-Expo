import { Stack } from 'expo-router';
import TabsLayout from './(tabs)/_layout';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile/ProfileMain" options={{ title: 'Profile' }} />
      <Stack.Screen name="profile/EditProfile" options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="achievements/index" />
      {/* Session stack */}
      <Stack.Screen name="session/index" />
      <Stack.Screen name="session/[id]" />
      <Stack.Screen name="modal/add-session" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
