import { Stack } from "expo-router";
import { ThemeProvider } from "./constants/themeContext";
import { Image } from 'react-native';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="session/profile-stack"
          options={{
            headerTitle: () => (
              <Image
                source={require('../assets/booked-time-logo.png')}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="(modals)"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
      
      
    </ThemeProvider>
  );
}