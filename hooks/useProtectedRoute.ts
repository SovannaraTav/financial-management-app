import { useEffect } from "react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function useProtectedRoute() {
    // Initialized router instance to enable navigation between screens
    const router = useRouter();

    /*
    Establishes a custom hook to route guard the routes for the tab screens 
    through Google Firebase's Auth service by checking the user's authentication 
    status. If the user is authenticated, redirect them to the corresponding tab 
    screen. Othwerise, redirect to the sign-in screen
    */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace("/sign-in");
            }
        });

        return () => unsubscribe();
    }, []);
}