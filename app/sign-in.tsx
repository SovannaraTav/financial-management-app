import { View, Text, StyleSheet } from "react-native";

export default function SignIn() {
    return (
        <View style={styles.container}>
            <Text>Sign-In Screen.</Text>
        </View>
    );
}

// Styling properties and values for the sign-up screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});