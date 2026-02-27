import { Tabs } from 'expo-router';
import {Button} from 'react-native';
import { useRouter } from 'expo-router'; // <-- Import router

export default function TabsLayout() {
  const router = useRouter(); // <-- Get router instance

  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home",
        headerRight: () => (<Button
          title="Profile"
          onPress={() => router.push('/profile/ProfileMain')}
        />  
        ) 
      }} />
      <Tabs.Screen name="history" options={{ title: "History",
        headerRight: () => (<Button
          title="Profile"
          onPress={() => navigation.navigate('profile/ProfileMain')}
        />  
        )
      }} />
      
      <Tabs.Screen name="achievements" options={{ title: "Achievements",
        headerRight: () => (<Button
          title="Profile"
          onPress={() => navigation.navigate('profile/ProfileMain')}
        />  
        )
      }} />
    </Tabs>
  );
}
