import { Stack } from "expo-router";
import { ThemeProvider } from "./constants/themeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="session/profile-stack"
          options={{
            title: "Profile",
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
