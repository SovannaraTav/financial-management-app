import { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet, Platform } from "react-native";
import { subscribeToFinancialDataUpdates } from "@/data/cloud-firestore-service";
import { PieChart } from "react-native-chart-kit";

// Retrieves the screen's width and height properties for responsive layout
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function EarningsSavingsExpensesPieChart() {
    /*
    State variable to pass in as props to the EarningsSavingsExpensesPieChart 
    component
    */
    const [categoriesData, setCategoriesData] = useState<any>(null);

    /*
    Establishes the chart style object's properties for the 
    EarningsSavingsExpensesPieChart component
    */
    const chartConfig = {
        backgroundGradientFrom: "#f2f2f2",
        backgroundGradientTo: "#f2f2f2",
        color: () => "#000000",
    };

    /*
    On initial render, attempts to fetch an authenticated user's saved financial 
    data through Google Firebase's NoSQL Cloud Firestore database service. If it 
    exists, calculate the total for each financial section by adding its 
    respective subsections together and updating the corresponding state variable 
    with the data after assigning each financial section total to either the 
    earnings, savings/investments, or expenses category objects

    Also, establishes a listener to subscribe to real-time updates, thus 
    automatically re-renders when the authenticated user's saved financial data is 
    updated. Cleans up the listener when the component unmounts
    */
    useEffect(() => {
        const unsubscribe = subscribeToFinancialDataUpdates(
            (fetchedFinancialData) => {
                if (fetchedFinancialData) {
                    let sectionsTotal: number[] = [];

                    fetchedFinancialData.sections.forEach(section => {
                        let sectionTotal = 0;
                        section.subsections.forEach(subsection => {
                            sectionTotal += subsection.amount;
                        });

                        sectionsTotal.push(sectionTotal);
                    });

                    const data = [
                        {
                            name: "Earnings",
                            total: sectionsTotal[0],
                            color: "#27ae60"
                        },
                        {
                            name: "Savings/Invests",
                            total: sectionsTotal[6],
                            color: "gray"
                        },
                        {
                            name: "Expenses",
                            total: 
                                (sectionsTotal[1] + sectionsTotal[2] + sectionsTotal[3] + sectionsTotal[4] 
                                + sectionsTotal[5] + sectionsTotal[7] + sectionsTotal[8] + sectionsTotal[9]),
                            color: "#c0392b"
                        }
                    ];
                    setCategoriesData(data);
                }
            },
        );

        return () => unsubscribe();
    }, []);

    /*
    Doesn't render the EarnginsSavingsExpensesPieChart component if no saved 
    financial data exists
    */
    if (!categoriesData) {
        return null;
    }

    return (
        <View>
            <Text style={styles.title}>1️⃣ Financial Overview</Text>
            <PieChart 
                data={categoriesData}
                width={Platform.OS !== "web" ? width * 0.9 : width * 0.5}
                height={Platform.OS !== "web" ? height * 0.2 : height * 0.6}
                chartConfig={chartConfig}
                accessor={"total"}
                backgroundColor={"none"}
                paddingLeft={"0"}
            />
        </View>
    );
}

// Styling properties and values for the EarnginsSavingsExpensesPieChart component
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 50
    }
});