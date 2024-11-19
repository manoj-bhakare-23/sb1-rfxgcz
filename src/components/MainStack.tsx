import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "./LoginScreen";
import { HomeScreen } from "./HomeScreen";
import { PersonalLoanScreen } from "./PersonalLoanScreen";
import { LeadsListScreen } from "./LeadsListScreen";

const StackNavigator = stackNavigatorFactory();

export function MainStack() {
    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: true,
                }}
            >
                <StackNavigator.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <StackNavigator.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <StackNavigator.Screen
                    name="PersonalLoan"
                    component={PersonalLoanScreen}
                    options={{ title: "Personal Loan" }}
                />
                <StackNavigator.Screen
                    name="LeadsList"
                    component={LeadsListScreen}
                    options={{ title: "My Leads" }}
                />
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
}