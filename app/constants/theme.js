import { colors } from "./colors";
import { spacing } from "./spacing";

export const theme = {
  colors,

  spacing,

  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
  },

  typography: {
    title: {
      fontSize: 32,
      fontWeight: "700",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "500",
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
    },
    small: {
      fontSize: 12,
      fontWeight: "400",
    },
  },

  shadow: {
    card: {
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
  },

  components: {
    button: {
      paddingVertical: spacing(1.5),
      borderRadius: 10,
      alignItems: "center",
    },
    card: {
      padding: spacing(2),
      borderRadius: 16,
      backgroundColor: colors.card,
      elevation: 3,
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      padding: spacing(2),
      backgroundColor: colors.card,
    },
  },
};