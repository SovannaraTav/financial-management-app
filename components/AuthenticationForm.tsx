import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

/*
Props for AuthenticationForm component:
1) Establishes the button's text to the provided string
2) Establishes the provided function to handle form submission
3) Indicates when the AuthenticationForm is for signing up
*/
type Props = {
    buttonText: string; 
    onSubmit: (email: string, password: string) => void;
    isSigningUp?: boolean;
};

/*
Regular expressions for real-time validation of the email and password inputs for the 
AuthenticationForm component
*/
const emailRegex = /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{12,64}$/;

// Email and password error messages for the AuthenticationForm component
const emailErrorMessage = "Invalid format. Must include @ and end with an email domain";
const passwordErrorMessage = 
    "Length between 12 to 64 characters. At least one lowercase, uppercase, number, and special character";

export default function AuthenticationForm({ buttonText, onSubmit, isSigningUp }: Props) {
    // State variables to keep track of user input information and any errors
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    // Handler function to validate the email input in real-time
    const handleEmailChange = (emailInput: string) => {
        setEmail(emailInput);
        setEmailError(!emailRegex.test(emailInput));
    };

    // Handler function to validate the password input in real-time when signing up
    const handlePasswordChange = (passwordInput: string) => {
        setPassword(passwordInput);

        if (isSigningUp) {
            setPasswordError(!passwordRegex.test(passwordInput));
        }
    };

    return (
        <View style={styles.container}>
            {/* Email input for AuthenticationForm component */}
            <Text style={styles.text}>Email:</Text>
            <TextInput 
                style={styles.textInput} 
                keyboardType="email-address"
                placeholder="Enter email address here"
                placeholderTextColor="gray"
                onChangeText={handleEmailChange}
                value={email}
            />
            {/* Displays email error message when there is an email input error */}
            {emailError && <Text style={styles.errorText}>{emailErrorMessage}</Text>}

            {/* Password input for the AuthenticationForm component */}
            <Text style={styles.text}>Password:</Text>
            <TextInput 
                style={styles.textInput} 
                secureTextEntry={true}
                placeholder="Enter password here"
                placeholderTextColor="gray"
                onChangeText={handlePasswordChange}
                value={password}
            />
            {/* Displays password error message when there is a password input error */}
            {passwordError && <Text style={styles.errorText}>{passwordErrorMessage}</Text>}

            {/* Submit button for AuthenticationForm component. Disables when there is either 
            an email or password input error*/}
            <Pressable 
                style={styles.button} 
                onPress={() => onSubmit(email, password)}
                disabled={emailError || passwordError}
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
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
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