import { Tabs } from 'expo-router';
import { Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerRight: () => (
            <Button
              title="Profile"
              onPress={() => router.push('/session/profile-stack')}
            />
          )
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerRight: () => (
            <Button
              title="Profile"
              onPress={() => router.push('/session/profile-stack')}
            />
          )
        }}
      />

      <Tabs.Screen
        name="achievements"
        options={{
          title: "Achievements",
          headerRight: () => (
            <Button
              title="Profile"
              onPress={() => router.push('/session/profile-stack')}
            />
          )
        }}
      />
    </Tabs>
  );
}

