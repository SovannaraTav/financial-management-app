import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack>
                <Stack.Screen name="index" options={{ title: "Introduction Screen" }} />
                <Stack.Screen name="sign-in" options={{ title: "Sign-In Screen" }} />
                <Stack.Screen name="sign-up" options={{ title: "Sign-Up Screen" }} />
            </Stack>
        </>
    );
}
