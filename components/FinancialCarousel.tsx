import { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet, Platform } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { saveFinancialData } from "@/data/cloud-firestore-service";
import FinancialSubsection from "./FinancialSubsection";

/*
Props for FinancialCarousel component:
1) Establishes the different financial sections with their respective subsections 
alongside fields such as id, title, and amount to serve as the data to be display
*/
type Props = {
    sections: { 
        id: string;
        title: string; 
        subsections: { 
            id: string;
            title: string;
            amount: number;
        }[] 
    }[];
};

// Retrieves the screen's width and height properties for responsive layout
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FinancialCarousel({ sections } : Props) {
    // Keeps track of the carousel's progress for the pagination dots
    const progress = useSharedValue<number>(0);

    /*
    State variable to keep track of the amounts of the different financial sections 
    with their respective subsections
    */
    const [financialData, setFinancialData] = useState(sections);

    /*
    On initial and subsequent renders, updates the financialData state variable with 
    the latest data represented by the sections prop
    */
    useEffect(() => {
        setFinancialData(sections);
    }, [sections]);

    /*
    Handler function to update the amounts of the different financial sections with 
    their respective subsections that were edited and maintaining the amounts that 
    were left unchanged
    */
    const handleSave = async (sectionId: string, subsectionId: string,  updatedAmount: number) => {
        const updatedFinancialData = financialData.map((section) => {
            if (section.id !== sectionId) {
                return section;
            }

            const updatedSubsections = section.subsections.map((subsection) => {
                if (subsection.id !== subsectionId) {
                    return subsection;
                } 

                return { ...subsection, amount: updatedAmount };
            });

            return { ...section, subsections: updatedSubsections };
        });

        setFinancialData(updatedFinancialData);
        await saveFinancialData({ sections: updatedFinancialData });
    };

    return (
        <View>
            {/* Carousel component to display each financial section with their 
            respective subsections separately */}
            <Carousel 
                width={width}
                height={Platform.OS !== "web" ? height * 0.6 : height * 0.7}
                data={financialData}
                onProgressChange={progress}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.sectionTitle}>{item.title}</Text>
                        {item.subsections.map((subsection) => (
                            <FinancialSubsection 
                                key={subsection.id}
                                sectionId={item.id}
                                subsectionId={subsection.id}
                                title={subsection.title} 
                                amount={subsection.amount}
                                onSave={handleSave}
                            />
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
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    }
});