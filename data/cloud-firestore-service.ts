import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

/*
Establishes the financial data's structure and fields to be stored in Google 
Firebase's NoSQL Cloud Firestore database service
*/
type FinancialData = {
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

/*
Function to save new finanical data or update existing financial data for an 
authenticated user through Google Firebase's NoSQL Cloud Firestore database service.
Displays a corresponding message based on the result
*/
export const saveFinancialData = async (data: FinancialData) => {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.log(
                "[Financial Data Status] Save Unsuccessful! No Authenticated User");
            return;
        }

        const documentReference = doc(db, "financials", `${userId}`);
        await setDoc(documentReference, data, { merge: true });
        console.log("[Financial Data Status] Save Successfully!");
    }
    catch (error) {
        console.error(`[Financial Data Status] Save Unsuccessful! ${error}`);
    }
}

/*
Function to retrieve existing finanical data and return it as an object or null to 
indicate an empty object for an authenticated user through Google Firebase's NoSQL 
Cloud Firestore database service. Displays a corresponding message based on the result
*/
export const retrieveFinancialData = async (): Promise<FinancialData | null> => {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.log(
                "[Financial Data Status] Retrieval Unsuccessful! No Authenticated User");
            return null;
        }

        const documentReference = doc(db, "financials", `${userId}`);
        const documentSnapshot = await getDoc(documentReference);
        if (documentSnapshot.exists()) {
            console.log("[Financial Data Status] Retrieve Successfully!");
            return documentSnapshot.data() as FinancialData;
        }
        else {
            console.log(
                "[Financial Data Status] Retrieval Unsuccessful! No Financial Data Found");
            return null;
        }
    }
    catch (error) {
        console.error(`[Financial Data Status] Retrieval Unsuccessful! ${error}`);
        return null;
    }
}

/*
Function for data visualization components to subscribe to real-time updates of the 
financial data for an authenticated user through Google Firebase's NoSQL Cloud 
Firestore database service. Displays a corresponding message based on the result

[onData Field] A callback function that is invoked when the financial data for an 
authenticated user changes. The function receives either the financial data as an 
object or null to indicate an empty object
[onError? Field] A optional callback function that is invoked if an error occurs 
when attempting to subscribe to real-time updates of the financial data for an 
authenticated user

[Return Field] A function that unsubscribes to real-time updates of the financial 
data for an authenticated user when invoked
*/
export const subscribeToFinancialDataUpdates = (
    onData: (data: FinancialData | null) => void,
    onError?: (error: any) => void
): (() => void) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
        console.log(
            "[Financial Data Listener] Subscribing Unsuccessful! No Authenticated User");
        return () => {};
    }

    const documentReference = doc(db, "financials", `${userId}`);

    // Establishes the listener for real-time updates
    const unsubscribeFromUpdates = onSnapshot(
        documentReference,
        (documentSnapshot) => {
            if (documentSnapshot.exists()) {
                console.log("[Financial Data Listener] Listening Successful! Update Received");
                onData(documentSnapshot.data() as FinancialData);
            }
            else {
                console.log("[Financial Data Listener] Listening Unsuccessful! No Financial Data Found");
                onData(null);
            }
        },
        (error) => {
            console.error(`[Financial Data Listener] Subscribing Unsuccessful! ${error}`);
            if (onError) {
                onError(error);
            }
        }
    );

    return unsubscribeFromUpdates;
}