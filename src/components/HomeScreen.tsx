import { Frame } from '@nativescript/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type HomeScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const loanTypes = [
        { id: 1, title: 'Personal Loan', route: 'PersonalLoan' },
        { id: 2, title: 'Home Loan', route: 'HomeLoan' },
        { id: 3, title: 'Vehicle Loan', route: 'VehicleLoan' },
        { id: 4, title: 'Property Loan', route: 'PropertyLoan' },
    ];

    return (
        <scrollView className="p-4">
            <stackLayout>
                {/* Ad Carousel */}
                <gridLayout rows="200" className="mb-4">
                    <image src="~/assets/banner.jpg" stretch="aspectFill" className="rounded-lg" />
                </gridLayout>

                {/* View Leads Button */}
                <button 
                    className="btn btn-primary mb-4"
                    text="View My Applications"
                    onTap={() => navigation.navigate('LeadsList')}
                />

                {/* Loan Types Grid */}
                <gridLayout rows="*, *" columns="*, *" className="mt-4">
                    {loanTypes.map((loan, index) => (
                        <stackLayout 
                            key={loan.id}
                            className="p-4 bg-white rounded-lg m-2 shadow"
                            row={Math.floor(index / 2)}
                            col={index % 2}
                            onTap={() => navigation.navigate(loan.route)}
                        >
                            <label className="text-lg font-bold text-center">{loan.title}</label>
                        </stackLayout>
                    ))}
                </gridLayout>
            </stackLayout>
        </scrollView>
    );
}