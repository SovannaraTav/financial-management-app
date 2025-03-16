import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack>
                {/* Main screen of the app upon opening it */}
                <Stack.Screen name="index" options={{ title: "Introduction Screen" }} />
                <Stack.Screen name="sign-in" options={{ title: "Sign-In Screen" }} />
                <Stack.Screen name="sign-up" options={{ title: "Sign-Up Screen" }} />

                {/* Tab navigator component of the app upon successfully signing in */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
