import { View, Alert, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import AuthenticationForm from "@/components/AuthenticationForm";

export default function SignUp() {
    // Initialized router instance to enable navigation between screens
    const router = useRouter();

    /*
    Handler function to attempt to sign up a new user with their provided account 
    credentials through Google Firebase Auth and displays a corresponding alert. If
    successful, the user is redirected to the main screen of the app
    */
    const handleSignUp = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            if (Platform.OS === "web") {
                alert("[Sign Up Status]: Successful");
                router.replace("/(tabs)");
            }
            else {
                Alert.alert("[Sign Up Status]:", "Successful", [
                    { text: "Ok", onPress: () => router.replace("/(tabs)") }
                ]);
            }
        }
        catch (e) {
            const error = e as AuthError;
            let errorMessage = "";

            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "The provided email is already in use";
                    break;
                default:
                    errorMessage = "An unexpected error occured";
                    break;
            }

            if (Platform.OS === "web") {
                alert(`[Sign Up Status]: Unsuccessful. ${errorMessage}`);
            }
            else {
                Alert.alert(`[Sign Up Status]: Unsuccessful. ${errorMessage}`);
            }
        }
    };

    return (
        <LinearGradient colors={["#4A90E2", "#FF69B4"]} style={styles.gradient}>
            <View style={styles.container}>
                <AuthenticationForm 
                    buttonText="Sign Up" 
                    onSubmit={handleSignUp}
                    isSigningUp
                />
            </View>
        </LinearGradient>
    );
}

// Styling properties and values for the sign-in screen
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