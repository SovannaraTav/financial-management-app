import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/*
Props for EditSaveIcon component:
1) Establishes whether to display the edit or save icon based on the provided 
boolean value
2) Establishes the handler function to call on when pressing the EditSaveIcon 
component
*/
type Props = {
    isEditing: boolean;
    onPress: () => void;
};

export default function EditSaveIcon({ isEditing, onPress } : Props) {
    return (
        <Pressable onPress={onPress}>
            {() => (
                <Ionicons name={isEditing ? "save-outline" : "pencil-outline"} size={18} />
            )}
        </Pressable>
    );
}