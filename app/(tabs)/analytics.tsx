import { ScrollView, StyleSheet } from "react-native";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import CategoriesBarChart from "@/components/data-visualizations/CategoriesBarChart";
import StackedCategoriesBarChart from "@/components/data-visualizations/StackedCategoriesBarChart";
import EarningsSavingsExpensesPieChart from "@/components/data-visualizations/EarningsSavingsExpensesPieChart";

export default function Analytics() {
    /*
    Utilizes the custom useProtectedRoute() hook to determine whether to render 
    this tab screen or redirect the user to the sign-in screen based on their 
    authentication status
    */
    useProtectedRoute();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CategoriesBarChart />
            <StackedCategoriesBarChart />
            <EarningsSavingsExpensesPieChart />
        </ScrollView>
    );
}

// Styling properties and values for the analytics screen
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 50
    }
});