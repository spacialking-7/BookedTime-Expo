import { Stack } from "expo-router";

export default function SessionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(modals)/editProfile"
        options={{ presentation: "modal", title: "Edit Profile" }}
      />
    </Stack>
  );
}