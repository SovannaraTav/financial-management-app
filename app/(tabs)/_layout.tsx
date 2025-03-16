import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            {/* Main screen of the app upon successfully signing in */}
            <Tabs.Screen name="index" options={{ title: "Info Screen" }} />
            <Tabs.Screen name="financials" options={{ title: "Financials Screen" }} />
            <Tabs.Screen name="analytics" options={{ title: "Analytics Screen" }} />
        </Tabs>
    );
}