import { View, Text, StyleSheet, Platform } from "react-native";
import { financialSectionsData } from "@/data/financial-sections-data";
import FinancialCarousel from "@/components/FinancialCarousel";

export default function Financials()
{
    return (
        <View style={styles.container}>
            {Platform.OS === "web" ? <Text>Financials Screen.</Text> : 
                <FinancialCarousel sections={financialSectionsData} />
            }
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