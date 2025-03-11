import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

/*
Props for AuthenticationForm component:
1) Establishes the button's text to the provided string
2) Establishes the provided function to handle form submission
*/
type Props = {
    buttonText: string; 
    onSubmit: (email: string, password: string) => void;
};

export default function AuthenticationForm({ buttonText, onSubmit }: Props) {
    // State variables to store user input information
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <View style={styles.container}>
            {/* Email input for AuthenticationForm component */}
            <Text style={styles.text}>Email:</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="Enter email address here"
                placeholderTextColor={"gray"}
                onChangeText={setEmail}
                value={email}
            />

            {/* Password input for the AuthenticationForm component */}
            <Text style={styles.text}>Password:</Text>
            <TextInput 
                style={styles.textInput} 
                secureTextEntry={true}
                placeholder="Enter password here"
                placeholderTextColor={"gray"}
                onChangeText={setPassword}
                value={password}
            />

            {/* Submit button for AuthenticationForm component */}
            <Pressable 
                style={styles.button} 
                onPress={() => onSubmit(email, password)}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
        </View>
    );
}

// Styling properties and values for the AuthenticationForm component
const styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "black",
        shadowOffset: { 
            width: 0, 
            height: 2 
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    textInput: {
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
});