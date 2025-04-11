import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import EditSaveIcon from "./EditSaveIcon";

/*
Props for FinancialSubsection component:
1) Establishes the financial section's id that the financial subsection is part of 
to the provided string 
2) Establishes the financial subsection's id to the provided string
3) Establishes the financial subsection's title to the provided string
4) Establishes the handler function to call on when transitioning from the edit 
state to the save state
*/
type Props = {
    sectionId: string;
    subsectionId: string;
    title: string;
    amount: number;
    onSave: (sectionId: string, subsectionId: string, updatedAmount: number) => void;
};

export default function FinancialSubsection(
    { sectionId, subsectionId, title, amount, onSave } : Props) {
    /*
    State variables to keep track of the editing state and the input amount entered 
    in the numeric input
    */
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputAmount, setInputAmount] = useState<string>("");

    /*
    On initial and subsequent renders, updates the inputAmount state variable with 
    the latest data represented by the amount prop
    */
    useEffect(() => {
        setInputAmount(amount?.toString());
    }, [amount]);

    /*
    Handler function to update the editing state and the input amount entered in 
    the numeric input when transitioning to the save state
    */
    const handleSave = () => {
        setIsEditing(false);
        const numericInputAmount = parseFloat(inputAmount);
        onSave(sectionId, subsectionId, numericInputAmount);
    };

    return (
        <View style={styles.container}>
            {/* Displays the financial subsection title and EditSaveIcon component */}
            <View style={styles.subsectionHeader}>
                <Text>{title}</Text>
                <EditSaveIcon 
                    isEditing={isEditing} 
                    onPress={() => isEditing ? handleSave() : setIsEditing(true)} 
                />
            </View>

            {/* Numeric input for FinancialSubsection component */}
            {Platform.OS === "ios" ?
                <TextInput 
                    style={styles.textInput}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholder="Enter monthly USD amount here"
                    placeholderTextColor="gray"
                    editable={isEditing}
                    value={inputAmount}
                    onChangeText={setInputAmount}
                />
                :
                <TextInput 
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder="Enter monthly USD amount here"
                    placeholderTextColor="gray"
                    editable={isEditing}
                    value={inputAmount}
                    onChangeText={setInputAmount}
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
    subsectionHeader: {
        width: 245,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textInput: {
        width: 250,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#ccc",
        padding: 5,
        marginTop: 5,
    }
});