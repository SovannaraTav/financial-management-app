import { Alert, Button, Platform } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/firebaseConfig";
import { signOut, AuthError } from "firebase/auth";

export default function SignOutButton()
{
    // Initialized router instance to enable navigation between screens
    const router = useRouter();

    /*
    Handler function to attempt to sign out a logged-in user through Google Firebase 
    Auth and displays a corresponding alert. If successful, the user is redirected to 
    the sign-in screen of the app
    */
    const handleSignOut = async () => {
        try {
            await signOut(auth);

            if (Platform.OS === "web") {
                alert("[Sign Out Status]: Successful");
                router.replace("/sign-in");
            }
            else {
                Alert.alert("[Sign Out Status]:", "Successful", [
                    { text: "Ok", onPress: () => router.replace("/sign-in") }
                ]);
            }
        }
        catch (e) {
            const error = e as AuthError;

            if (Platform.OS === "web") {
                alert(`[Sign Out Status]: Unsuccessful. ${error.message}`);
            }
            else {
                Alert.alert(`[Sign Out Status]: Unsuccessful. ${error.message}`);
            }
        }
    }

    return (
        <Button title="Sign Out" onPress={handleSignOut} />
    );
}