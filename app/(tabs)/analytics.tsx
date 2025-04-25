import { ScrollView, StyleSheet } from "react-native";
import CategoriesBarChart from "@/components/data-visualizations/CategoriesBarChart";
import StackedCategoriesBarChart from "@/components/data-visualizations/StackedCategoriesBarChart";
import EarningsSavingsExpensesPieChart from "@/components/data-visualizations/EarningsSavingsExpensesPieChart";

export default function Analytics() {
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