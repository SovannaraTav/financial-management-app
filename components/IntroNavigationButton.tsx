import { Pressable, Text, StyleSheet } from "react-native";
import { Link, RelativePathString } from "expo-router";

/*
Props for IntroNavigationButton component:
1) Establishes the navigation link to the provided string after typecasting it 
to a RelativePathString data type
2) Establishes the button's text to the provided string
*/
type Props = {
    path: string;
    buttonText: string;
}

export default function IntroNavigationButton({ path, buttonText } : Props) {
    return (
        <Link href={path as RelativePathString} asChild>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
        </Link>
    );
}

// Styling properties and values for the IntroNavigationButton component
const styles = StyleSheet.create({
    button: {
        width: 300,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        paddingVertical: 10,
        marginVertical: 10,
        shadowColor: "black",
        shadowOffset: { 
            width: 0, 
            height: 2 
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    }
});