import { View, Text, StyleSheet } from "react-native";
import SignOutButton from "@/components/SignOutButton";

export default function Financials()
{
    return (
        <View style={styles.container}>
            <Text>Financials Screen.</Text>
        </View>
    );
}

// Styling properties and values for the financials screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});