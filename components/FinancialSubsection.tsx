import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

/*
Props for FinancialSubsection component:
1) Establishes the financial subsection's title to the provided string
*/
type Props = {
    title: string,
};

export default function FinancialSubsection({ title } : Props) {
    return (
        <View style={styles.container}>
            {/* Numeric input for FinancialSubsection component */}
            <Text>{title}</Text>
            {Platform.OS === "ios" ?
                <TextInput 
                    style={styles.textInput}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholder="Enter monthly amount here"
                    placeholderTextColor="gray"
                />
                :
                <TextInput 
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder="Enter monthly amount here"
                    placeholderTextColor="gray"
                />
            }
        </View>
    );
}

// Styling properties and values for the FinancialSubsection component
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
    },
    textInput: {
        width: 225,
        textAlign: "center",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#ccc",
        padding: 5,
        marginTop: 5,
    }
});