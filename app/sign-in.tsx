import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AuthenticationForm from "@/components/AuthenticationForm";

export default function SignIn() {
    return (
        <LinearGradient colors={["#4A90E2", "#FF69B4"]} style={styles.gradient}>
            <View style={styles.container}>
                <AuthenticationForm 
                    buttonText="Sign In" 
                    onSubmit={(email, password) => console.log(email, password)}
                />
            </View>
        </LinearGradient>
    );
}

// Styling properties and values for the sign-up screen
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});