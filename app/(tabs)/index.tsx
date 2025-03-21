import { View, Text, StyleSheet } from "react-native";

export default function Info()
{
    return (
        <View style={styles.container}>
            <Text>Info Screen.</Text>
        </View>
    );
}

// Styling properties and values for the info screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});