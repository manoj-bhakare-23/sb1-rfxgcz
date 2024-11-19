import { EventData } from '@nativescript/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { submitLoanLead } from '../services/api';

type PersonalLoanScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "PersonalLoan">,
};

export function PersonalLoanScreen({ navigation }: PersonalLoanScreenProps) {
    const [formData, setFormData] = React.useState({
        name: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        occupation: "",
        loanAmount: "",
    });
    const [error, setError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            setError("");
            await submitLoanLead(formData);
            navigation.navigate("Home");
        } catch (err) {
            setError("Failed to submit loan application");
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateForm = () => {
        return (
            formData.name &&
            formData.phoneNumber &&
            formData.address &&
            formData.dateOfBirth &&
            formData.occupation &&
            formData.loanAmount
        );
    };

    return (
        <scrollView className="p-4">
            <stackLayout className="p-4">
                <label className="text-2xl font-bold text-center mb-8">Personal Loan Application</label>
                
                {error ? <label className="text-red-500 mb-4">{error}</label> : null}
                
                <textField
                    className="input mb-4 p-4"
                    hint="Full Name"
                    text={formData.name}
                    editable={!isSubmitting}
                    onTextChange={(args: EventData) => 
                        setFormData({...formData, name: args.object.get("text")})}
                />
                
                <textField
                    className="input mb-4 p-4"
                    hint="Phone Number"
                    keyboardType="phone"
                    text={formData.phoneNumber}
                    editable={!isSubmitting}
                    onTextChange={(args: EventData) => 
                        setFormData({...formData, phoneNumber: args.object.get("text")})}
                />
                
                <textField
                    className="input mb-4 p-4"
                    hint="Address"
                    text={formData.address}
                    editable={!isSubmitting}
                    onTextChange={(args: EventData) => 
                        setFormData({...formData, address: args.object.get("text")})}
                />
                
                <textField
                    className="input mb-4 p-4"
                    hint="Date of Birth (YYYY-MM-DD)"
                    text={formData.dateOfBirth}
                    editable={!isSubmitting}
                    onTextChange={(args: EventData) => 
                        setFormData({...formData, dateOfBirth: args.object.get("text")})}
                />
                
                <textField
                    className="input mb-4 p-4"
                    hint="Occupation"
                    text={formData.occupation}
                    editable={!isSubmitting}
                    onTextChange={(args: EventData) => 
                        setFormData({...formData, occupation: args.object.get("text")})}
                />
                
                <textField
                    className="input mb-4 p-4"
                    hint="Loan Amount"
                    keyboardType="number"
                    text={formData.loanAmount}
                    editable={!isSubmitting}
                    onTextChange={(args: EventData) => 
                        setFormData({...formData, loanAmount: args.object.get("text")})}
                />
                
                <button
                    className="btn btn-primary p-4"
                    text={isSubmitting ? "Submitting..." : "Submit Application"}
                    onTap={handleSubmit}
                    isEnabled={!isSubmitting && validateForm()}
                />
            </stackLayout>
        </scrollView>
    );
}