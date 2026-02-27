
//img source: https://pixabay.com/vectors/elephant-baby-blue-304755/
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import { Image } from "react-native";
import Elephant from "../../../assets/elephant.png";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { theme } from "../../constants/theme";


const screenWidth = Dimensions.get("window").width;
const mascotSize = screenWidth * 0.1; //10% of screen width

export default function HomeScreen() {
  const [elapsed, setElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [notesInput, setNotesInput] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const intervalRef = useRef(null);

  const quotes = [
    "Reading is dreaming with open eyes.",
    "One page a day changes your life.",
    "Small progress is still progress.",
  ];

  const fabAnim = useRef(new Animated.Value(0)).current;

  const animateFAB = () => {
    Animated.sequence([
      Animated.timing(fabAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fabAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  //save session to AsyncStorage when timer is stopped (history tab)
  const saveSession = async () => {
    const newSession = {
      id: Date.now(),
      duration: elapsed,
      notes: notesInput,
      timestamp: new Date().toISOString(),
    };

    const existing = await AsyncStorage.getItem("sessions");
    const sessions = existing ? JSON.parse(existing) : [];

    sessions.push(newSession);
    await AsyncStorage.setItem("sessions", JSON.stringify(sessions));
  };

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTimerRunning]);

  const minutes = Math.floor(elapsed / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (elapsed % 60).toString().padStart(2, "0");

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
      <View style={styles.header}>
        <Image source={Elephant} style={styles.mascot} />
        <Text style={styles.title}>Booked Time</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.timer}>
          {minutes}:{seconds}
        </Text>

        <TextInput
          placeholder="Add notes..."
          style={styles.input}
          value={notesInput}
          onChangeText={setNotesInput}
        />

        <View style={styles.buttonRow}>
          <Pressable
            style={styles.button}
            onPress={() => setIsTimerRunning(true)}
          >
            <Text style={styles.buttonLabel}>Start</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.secondary }]}
            onPress={() => setIsTimerRunning(false)}
          >
            <Text style={styles.buttonLabel}>Pause</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "#E53935" }]}
            onPress={async () => {
              setIsTimerRunning(false);
              clearInterval(intervalRef.current);

              await saveSession(); // now valid
              setElapsed(0);
              setNotesInput("");
            }}
          >
            <Text style={styles.buttonLabel}>Stop</Text>
          </Pressable>
        </View>

        {showQuote && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={{ textAlign: "center" }}>
                {quotes[Math.floor(Math.random() * quotes.length)]}
              </Text>
            </Card.Content>
          </Card>
        )}
      </View>

      <Animated.View
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          transform: [{ translateY: fabAnim }],
        }}
      >
        <FAB
          icon="lightbulb"
          onPress={() => {
            setShowQuote(!showQuote);
            animateFAB();
          }}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  header: {
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },

  content: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing(1),
  },

  timer: {
    fontSize: 48, // stays custom because it's a special element
    fontWeight: "700",
    marginVertical: theme.spacing(2),
    color: theme.colors.textPrimary,
  },

  input: {
    ...theme.components.input,
    width: "100%",
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing(2),
  },

  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },

  button: {
    ...theme.components.button,
    flex: 1,
    marginHorizontal: theme.spacing(0.5),
    backgroundColor: theme.colors.primary,
  },

  buttonLabel: {
    ...theme.typography.body,
    color: theme.colors.buttonText,
    fontWeight: "600",
  },

  card: {
    ...theme.components.card,
    width: "100%",
    marginTop: theme.spacing(2),
  },

  mascot: {
    width: mascotSize,
    height: mascotSize,
    marginBottom: theme.spacing(1),
    resizeMode: "contain",
    alignSelf: "center",
  },
});