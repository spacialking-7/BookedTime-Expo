import { Stack, Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'Booked Time',
        headerRight: () => (
          <Link href="/session/profile-stack" asChild>
            <Pressable>
              <Text style={{ fontSize: 16 }}>Profile</Text>
            </Pressable>
          </Link>
        ),
      }}
    />
  );
}

          



