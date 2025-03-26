import { View, StyleSheet } from "react-native";
import { financialSectionsData } from "@/data/financial-sections-data";
import FinancialCarousel from "@/components/FinancialCarousel";

export default function Financials()
{
    return (
        <View style={styles.container}>
            <FinancialCarousel sections={financialSectionsData} />
        </View>
    );
}

// Styling properties and values for the financials screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});