import { View, Text, StyleSheet } from "react-native";

export default function SignUp() {
    return (
        <View style={styles.container}>
            <Text>Sign-Up Screen.</Text>
        </View>
    );
}

// Styling properties and values for the sign-in screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});