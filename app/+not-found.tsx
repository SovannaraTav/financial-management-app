import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function NotFound() {
    return (
        // Appears when an invalid/non-existent route is provided
        <View style={styles.container}>
            <Text style={styles.text}>Page Not Found.</Text>

            {/* Navigation link to the main (landing) screen */}
            <Link href="/" style={styles.link}>Navigate Back To The Introduction Screen</Link>
        </View>
    );
}

// Styling properties and values for the page not found screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    link: {
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "#007bff"
    }
});