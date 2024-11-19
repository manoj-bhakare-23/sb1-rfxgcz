import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { getLeads } from '../services/api';

type LeadsListScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "LeadsList">,
};

interface Lead {
    _id: string;
    name: string;
    loanType: string;
    loanAmount: number;
    status: string;
    createdAt: string;
}

export function LeadsListScreen({ navigation }: LeadsListScreenProps) {
    const [leads, setLeads] = React.useState<Lead[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            setIsLoading(true);
            const response = await getLeads();
            setLeads(response);
        } catch (err) {
            setError("Failed to load leads");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'text-green-600';
            case 'rejected':
                return 'text-red-600';
            default:
                return 'text-yellow-600';
        }
    };

    return (
        <scrollView className="p-4">
            <stackLayout>
                <label className="text-2xl font-bold text-center mb-4">My Loan Applications</label>
                
                {error ? (
                    <label className="text-red-500 text-center mb-4">{error}</label>
                ) : null}

                {isLoading ? (
                    <activityIndicator busy={true} className="m-4" />
                ) : (
                    <stackLayout>
                        {leads.length === 0 ? (
                            <label className="text-center text-gray-500 m-4">
                                No loan applications found
                            </label>
                        ) : (
                            <repeaterModule items={leads}>
                                <repeaterModule.itemTemplate>
                                    <gridLayout 
                                        columns="*, auto" 
                                        className="bg-white rounded-lg p-4 m-2 shadow"
                                    >
                                        <stackLayout col="0">
                                            <label className="font-bold text-lg">
                                                {{ item.name }}
                                            </label>
                                            <label className="text-gray-600">
                                                {{ item.loanType }} Loan
                                            </label>
                                            <label className="text-gray-600">
                                                Amount: ₹{{ item.loanAmount }}
                                            </label>
                                            <label className="text-gray-500 text-sm">
                                                {{ formatDate(item.createdAt) }}
                                            </label>
                                        </stackLayout>
                                        <label 
                                            col="1" 
                                            className="{{ 'capitalize ' + getStatusColor(item.status) }}"
                                            text="{{ item.status }}"
                                        />
                                    </gridLayout>
                                </repeaterModule.itemTemplate>
                            </repeaterModule>
                        )}
                    </stackLayout>
                )}

                <button 
                    className="btn btn-primary m-4" 
                    text="Refresh"
                    onTap={loadLeads}
                    isEnabled={!isLoading}
                />
            </stackLayout>
        </scrollView>
    );
}