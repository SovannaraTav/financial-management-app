import { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet, Platform } from "react-native";
import { subscribeToFinancialDataUpdates } from "@/data/cloud-firestore-service";
import { BarChart } from "react-native-chart-kit";

// Retrieves the screen's width and height properties for responsive layout
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CategoriesBarChart() {
    // State variables to pass in as props to the BarChart component
    const [categoriesData, setCategoriesData] = useState<any>(null);
    const [barPercentageValue, setBarPercentageValue] = useState<number>(0.5);

    // Establishes the chart style object's properties for the BarChart component
    const chartConfig = {
        backgroundGradientFrom: "#f2f2f2",
        backgroundGradientTo: "#f2f2f2",
        color: () => "#007bff",
        labelColor: () => "#000000",
        barPercentage: barPercentageValue,
    };

    /*
    On initial render, attempts to fetch an authenticated user's saved financial 
    data through Google Firebase's NoSQL Cloud Firestore database service. If it 
    exists, calculate the total for each financial section by adding its 
    respective subsections together and updating the corresponding state variable 
    with the data

    Also, establishes a listener to subscribe to real-time updates, thus 
    automatically re-renders when the authenticated user's saved financial data is 
    updated. Cleans up the listener when the component unmounts
    */
    useEffect(() => {
        const unsubscribe = subscribeToFinancialDataUpdates(
            (fetchedFinancialData) => {
                if (fetchedFinancialData) {
                    let sectionsTotal: number[] = [];
                    let sectionLabels: number[] = [];
                    let currentSectionLabel = 1;

                    fetchedFinancialData.sections.forEach(section => {
                        let sectionTotal = 0;
                        section.subsections.forEach(subsection => {
                            sectionTotal += subsection.amount;
                        });
                        sectionsTotal.push(sectionTotal);
                        sectionLabels.push(currentSectionLabel);
                        currentSectionLabel += 1;
                    });

                    const data = {
                        labels: sectionLabels,
                        datasets: [{ data: sectionsTotal }]
                    };
                    setCategoriesData(data);
                }

                if (Platform.OS === "web") {
                    setBarPercentageValue(1);
                }
            },
        );

        return () => unsubscribe();
    }, []);

    // Doesn't render the BarChart component if no saved financial data exists
    if (!categoriesData) {
        return null;
    }

    return (
        <View>
            <Text style={styles.title}>1️⃣ Total by Financial Categories</Text>
            <BarChart 
                data={categoriesData}
                width={Platform.OS !== "web" ? width * 0.9 : width * 0.5}
                height={height * 0.6}
                fromZero={true}
                yAxisLabel="$"
                yAxisSuffix=""
                horizontalLabelRotation={-45}
                chartConfig={chartConfig}
                showValuesOnTopOfBars={true}
            />
        </View>
    );
}

// Styling properties and values for the CategoriesBarChart component
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 50
    }
});