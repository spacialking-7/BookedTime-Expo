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

const colors = {
  primary: "#1E88E5",
  secondary: "#FFC107",
  background: "#F5F5F5",
  card: "#FFFFFF",
  textPrimary: "#212121",
  textSecondary: "#616161",
  buttonText: "#FFFFFF",
};

const screenWidth = Dimensions.get("window").width;
const mascotSize = screenWidth * 0.3; // 30% of screen width

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
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Elephant} style={styles.mascot} />
      <Text style={styles.title}>Booked Time</Text>

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
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => setIsTimerRunning(false)}
        >
          <Text style={styles.buttonLabel}>Pause</Text>
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
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: "700",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    width: "100%",
    marginTop: 20,
  },
  mascot: {
    width: mascotSize,
    height: mascotSize,
    marginBottom: 12,
    resizeMode: "contain",
  },
});
