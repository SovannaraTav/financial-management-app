import { View, StyleSheet } from "react-native";
import AppInformation from "@/components/AppInformation";

export default function Info() {
    return (
        <View style={styles.container}>
            <AppInformation />
        </View>
    );
}

// Styling properties and values for the info screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});