import { View, StyleSheet } from "react-native";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import AppInformation from "@/components/AppInformation";

export default function Info() {
    /*
    Utilizes the custom useProtectedRoute() hook to determine whether to render 
    this tab screen or redirect the user to the sign-in screen based on their 
    authentication status
    */
    useProtectedRoute();

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