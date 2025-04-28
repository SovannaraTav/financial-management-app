import { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet, Platform } from "react-native";
import { subscribeToFinancialDataUpdates } from "@/data/cloud-firestore-service";
import { StackedBarChart } from "react-native-chart-kit";

// Retrieves the screen's width and height properties for responsive layout
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function StackedCategoriesBarChart() {
    // State variables to pass in as props to the StackedCategoriesBarChart component
    const [categoriesData, setCategoriesData] = useState<any>(null);
    const [barPercentageValue, setBarPercentageValue] = useState<number>(0.5);

    /*
    Establishes the chart style object's properties for the StackedCategoriesBarChart 
    component
    */
    const chartConfig = {
        backgroundGradientFrom: "#f2f2f2",
        backgroundGradientTo: "#f2f2f2",
        color: () => "#000000",
        barPercentage: barPercentageValue
    };

    /*
    On initial render, attempts to fetch an authenticated user's saved financial 
    data through Google Firebase's NoSQL Cloud Firestore database service. If it 
    exists, it normalizes the amounts of each financial section's subsections to 
    percentages out of 100%, representing the portion each subsection contributes 
    to the section's total

    Also, establishes a listener to subscribe to real-time updates, thus 
    automatically re-renders when the authenticated user's saved financial data is 
    updated. Cleans up the listener when the component unmounts
    */
    useEffect(() => {
        const unsubscribe = subscribeToFinancialDataUpdates(
            (fetchedFinancialData) => {
                if (fetchedFinancialData) {
                    let sections: number[][] = [];
                    let sectionLabels: number[] = [];
                    let currentSectionLabel = 1;

                    fetchedFinancialData.sections.forEach(section => {
                        let sectionData: number[] = [];
                        section.subsections.forEach(subsection => {
                            sectionData.push(subsection.amount);
                        });

                        const sectionDataTotal = sectionData.reduce((total, value) => total + value, 0);
                        const normalizedSectionData = (sectionDataTotal > 0 
                            ? sectionData.map(value => (value / sectionDataTotal) * 100) 
                            : sectionData.map(() => 0));

                        sections.push(normalizedSectionData);
                        sectionLabels.push(currentSectionLabel);
                        currentSectionLabel += 1;
                    });

                    const data = {
                        labels: sectionLabels,
                        data: sections,
                        barColors: ["#9b59b6", "#2980b9", "#e67e22", "#27ae60", "#c0392b"]
                    };
                    setCategoriesData(data);
                }

                if (Platform.OS === "web") {
                    setBarPercentageValue(1.25);
                }
            },
        );

        return () => unsubscribe();
    }, []);

    /*
    Doesn't render the StackedCategoriesBarChart component if no saved financial 
    data exists, thus renders a text fallback option
    */
    if (!categoriesData) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackDescription}>
                    [2] <Text style={styles.bold}>Stacked Percentages by Financial Categories</Text> will 
                    be rendered once new data has been entered and saved in the financials tab screen.
                </Text>
            </View>
        );
    }

    return (
        <View>
            <Text style={styles.title}> 2️⃣ Stacked Percentages by Financial Categories</Text>
            <Text style={styles.legend}>🟪 Subsection 1</Text>
            <Text style={styles.legend}>🟦 Subsection 2</Text>
            <Text style={styles.legend}>🟧 Subsection 3</Text>
            <Text style={styles.legend}>🟩 Subsection 4</Text>
            <Text style={styles.legend}>🟥 Subsection 5</Text>

            <StackedBarChart 
                data={categoriesData}
                width={Platform.OS !== "web" ? width * 0.9 : width * 0.6}
                height={Platform.OS !== "web" ? height * 0.4 :height * 0.6}
                yAxisSuffix="%"
                decimalPlaces={0}
                segments={20}
                chartConfig={chartConfig}
                hideLegend={true}
            />
        </View>
    );
}

// Styling properties and values for the StackedCategoriesBarChart component
const styles = StyleSheet.create({
    fallbackContainer: {
        width: (width * 0.9),
        alignItems: "center"
    },
    fallbackDescription: {
        fontSize: 16
    },
    bold: {
        fontWeight: "bold"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },
    legend: {
        textAlign: "center",
        marginBottom: 5
    }
});