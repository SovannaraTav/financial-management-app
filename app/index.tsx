import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IntroNavigationButton from "@/components/IntroNavigationButton";

export default function Index() {
    return (
        // Sets the background of the introduction screen to a blue to pink linear gradient
        <LinearGradient colors={["#4A90E2", "#FF69B4"]} style={styles.gradient}>
            <View style={styles.container}>
                {/* Navigation button to the sign-in screen */}
                <IntroNavigationButton path="/sign-in" buttonText="Sign In" />

                {/* Navigation button to the sign-up screen */}
                <IntroNavigationButton path="/sign-up" buttonText="Sign Up" />
            </View>
        </LinearGradient>
    );
}

// Styling properties and values for the introduction screen
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});