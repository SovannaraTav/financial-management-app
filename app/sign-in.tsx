import { View, Alert, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import AuthenticationForm from "@/components/AuthenticationForm";

export default function SignIn() {
    // Initialized router instance to enable navigation between screens
    const router = useRouter();

    /*
    Handler function to attempt to sign in an existing user with their provided account 
    credentials through Google Firebase Auth and displays a corresponding alert. If
    successful, the user is redirected to the main screen of the app
    */
    const handleSignIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            if (Platform.OS === "web") {
                alert("[Sign In Status]: Successful");
                router.replace("/(tabs)");
            }
            else {
                Alert.alert("[Sign In Status]:", "Successful", [
                    { text: "Ok", onPress: () => router.replace("/(tabs)") }
                ]);
            }
        }
        catch (e) {
            const error = e as AuthError;
            let errorMessage = "";

            switch (error.code) {
                case "auth/invalid-credential":
                    errorMessage = 
                        "The provided email is not associated with an account or incorrect credentials provided";
                    break;
                default:
                    errorMessage = "An unexpected error occured";
                    break;
            }

            if (Platform.OS === "web") {
                alert(`[Sign In Status]: Unsuccessful. ${errorMessage}`);
            }
            else {
                Alert.alert(`[Sign In Status]: Unsuccessful. ${errorMessage}`);
            }
        }
    };

    return (
        <LinearGradient colors={["#4A90E2", "#FF69B4"]} style={styles.gradient}>
            <View style={styles.container}>
                <AuthenticationForm 
                    buttonText="Sign In" 
                    onSubmit={handleSignIn}
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