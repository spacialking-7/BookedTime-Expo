import { Stack } from 'expo-router';
import TabsLayout from './(tabs)/_layout';

export default function RootLayout() {
  return (
    <Stack>
      {/* Main Tabs */}
      <Stack.Screen name="(tabs)/_layout" options={{ headerShown: false }} />
      {/* Profile Stack */}
      <Stack.Screen name="profile/ProfileMain" options={{ title: 'Profile' }} />
      <Stack.Screen name="profile/EditProfile" options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="achievements/index" />
      {/* Session stack */}
      <Stack.Screen name="session/index" options={{ title: 'Sessions' }} />
      <Stack.Screen name="session/[id]" options={{ title: 'Session Details' }} />
      {/* Modals */}
       <Stack.Screen name="(modals)/add-session" options={{ presentation: 'modal', title: 'Add Session' }} />
      <Stack.Screen name="(modals)/info" options={{ presentation: 'modal', title: 'Session Info' }} />
   
    </Stack>
  );
}




