import { View, Text, StyleSheet } from "react-native";
import SignOutButton from "@/components/SignOutButton";

export default function Analytics()
{
    return (
        <View style={styles.container}>
            <Text>Analytics Screen.</Text>
            <SignOutButton />
        </View>
    );
}

// Styling properties and values for the analytics screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});