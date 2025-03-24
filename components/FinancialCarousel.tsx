import { Dimensions, View, Text, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import FinancialSubsection from "./FinancialSubsection";

/*
Props for FinancialCarousel component:
1) Establishes the different financial sections with their respective subsections 
to serve as the data to be display
*/
type Props = {
    sections: { title: string, subsections: { title: string }[] }[];
};

// Retrieves the screen's width and height properties for responsive layout
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FinancialCarousel({ sections } : Props)
{
    // Keeps track of the carousel's progress for the pagination dots
    const progress = useSharedValue<number>(0);

    return (
        <View>
            {/* Carousel component to display each financial section with their 
            respective subsections separately */}
            <Carousel 
                width={width}
                height={height * 0.6}
                data={sections}
                onProgressChange={progress}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.sectionTitle}>{item.title}</Text>
                        {item.subsections.map((subsection, index) => (
                            <FinancialSubsection title={subsection.title} key={index} />
                        ))}
                    </View>
                )}
            />

            {/* Pagination component to display the total number of financial 
            sections and the current financial section on display */}
            <Pagination.Basic 
                progress={progress}
                data={sections}
                dotStyle={{ backgroundColor: "lightgray" }}
                activeDotStyle={{ backgroundColor: "#007bff" }}
                containerStyle={{ gap: 10 }}
            />
        </View>
    );
}

// Styling properties and values for the FinancialCarousel component
const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    }
});