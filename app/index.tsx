import { View, Pressable, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
    return (
        // Sets the background of the introduction screen to a blue to pink linear gradient
        <LinearGradient colors={["#4A90E2", "#FF69B4"]} style={styles.gradient}>
            <View style={styles.container}>
                {/* Button to the sign-up screen */}
                <Link href="/sign-in" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Pressable>
                </Link>

                {/* Button to the sign-up screen */}
                <Link href="/sign-up" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                </Link>
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
    button: {
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        paddingVertical: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    }
});