import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SignOutButton from "@/components/SignOutButton";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#007bff",
            }}
        >
            {/* Main screen of the app upon successfully signing in. The sign out icon is 
            located in the top right of each tab screen. Each tab screen's icon also 
            implements both an active and inactive state */}
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: "Info Screen",
                    headerRight: () => <SignOutButton />,
                    tabBarIcon: ({ focused, color }) => ( 
                        <Ionicons 
                            name={focused ? "information-circle" : "information-circle-outline"} 
                            color={color} size={24} 
                        />
                    )
                }} 
            />
            <Tabs.Screen 
                name="financials" 
                options={{ 
                    title: "Financials Screen",
                    headerRight: () => <SignOutButton />,
                    tabBarIcon: ({ focused, color }) => ( 
                        <Ionicons 
                            name={focused ? "card" : "card-outline"} 
                            color={color} size={24} 
                        />
                    )
                }} 
            />
            <Tabs.Screen 
                name="analytics" 
                options={{ 
                    title: "Analytics Screen",
                    headerRight: () => <SignOutButton />,
                    tabBarIcon: ({ focused, color }) => ( 
                        <Ionicons 
                            name={focused ? "bar-chart" : "bar-chart-outline"} 
                            color={color} size={24} 
                        />
                    )
                }} 
            />
        </Tabs>
    );
}