import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { financialSectionsData } from "@/data/financial-sections-data";
import { retrieveFinancialData } from "@/data/cloud-firestore-service";
import FinancialCarousel from "@/components/FinancialCarousel";

export default function Financials() {
    /*
    State variable to hold the financial section data that will be display in the
    FinancialCarousel component and is pass in as a prop
    */
    const [sectionsData, setSectionsData] = useState(financialSectionsData);

    /*
    On initial render, attempts to fetch an authenticated user's saved financial 
    data through Google Firebase's NoSQL Cloud Firestore database service. If it 
    exists, updates the state variable with the data. Otherwise, defaults to the 
    predefined financialSectionsData
    */
    useEffect(() => {
        const fetchFinancialData = async () => {
            const fetchedFinancialData = await retrieveFinancialData();
            if (fetchedFinancialData?.sections) {
                setSectionsData(fetchedFinancialData.sections);
            }
        }

        fetchFinancialData();
    }, []);

    return (
        <View style={styles.container}>
            <FinancialCarousel sections={sectionsData} />
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