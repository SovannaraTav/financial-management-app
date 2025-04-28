import { Dimensions, View, Text, StyleSheet, Platform } from "react-native";

// Retrieves the screen's width property for responsive layout
let width = Dimensions.get("window").width;
width = (Platform.OS !== "web" ? (width * 0.95) : (width * 0.4));

export default function AppInformation() {
    return (
        <View style={styles.container}>
            {/* Information to help the user understand the purpose of the Financials tab screen */}
            <Text style={styles.title}>1️⃣ Financials Tab Screen</Text>
            <Text style={styles.description}>
                This screen features 10 financial categories to manage and keep track of. Each 
                category consists of 5 subcategories. To input a monthly amount for a subcategory, 
                select the edit icon above the number input field, enter the amount, and save it 
                using the save icon. 
                Your data will be saved and persist across sessions, thus there is no need to 
                refresh the screen.
                Swipe right to move forward and left to go back between categories.
            </Text>

            {/* Information to help the user understand the purpose of the Analytics tab screen */}
            <Text style={styles.title}>2️⃣ Analytics Tab Screen</Text>
            <Text style={styles.description}>
                This screen features 3 real-time data visualizations based on data the entered 
                in the financials tab screen, thus there is no need to refresh the screen:
                
                {"\n\n"}[1] <Text style={styles.bold}>Total by Financial Categories</Text>: 
                A bar chart displaying the total sum of subcategories for each category. X-axis 
                labels 1–10 represent categories from Income (1) to Entertainment, Leisure, & 
                Miscellaneous (10).

                {"\n\n"}[2] <Text style={styles.bold}>Stacked Percentages by Financial Categories</Text>: 
                A stacked bar chart displaying how the subcategories represented by different 
                colors contribute to each category's total out of 100%.

                {"\n\n"}[3] <Text style={styles.bold}>Financial Health Summary</Text>: 
                A pie chart displaying the percentage breakdown out of 100% of your earnings 
                (Income category), savings/investments (Savings & Investments category), and 
                expenses (all other categories).
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        padding: 5
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5
    },
    description: {
        fontSize: 16,
        marginBottom: 10
    },
    bold: {
        fontWeight: "bold"
    }
});
