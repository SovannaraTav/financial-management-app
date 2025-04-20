import { Dimensions, View, Text, StyleSheet, Platform } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

// Retrieves the screen's width and height properties for responsive layout
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// Data to be displayed separately by the Carousel component
const data = ["Section 1", "Section 2", "Section 3"];

export default function Analytics() {
    // Keeps track of the Carousel component's progress for the pagination dots
    const progress = useSharedValue<number>(0);

    return (
        <View style={styles.container}>
            {Platform.OS === "web" ? <Text>Analytics Screen.</Text> : 
                <>
                    {/* Carousel component to display each data separately */}
                    <Carousel 
                    width={width}
                    height={height * 0.75}
                    data={data}
                    onProgressChange={progress}
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text>{item}</Text>
                        </View>
                    )}
                    />

                    {/* Pagination component to display the total number of data 
                    items and the current data item on display */}
                    <Pagination.Basic 
                        progress={progress}
                        data={data}
                        dotStyle={{ backgroundColor: "lightgray" }}
                        activeDotStyle={{ backgroundColor: "#007bff" }}
                        containerStyle={{ gap: 10, marginTop: 10}}
                    />
                </>
            }
        </View>
    );
}

// Styling properties and values for the analytics screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});