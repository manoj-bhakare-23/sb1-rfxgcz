import { EventData } from '@nativescript/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { login } from '../services/api';

type LoginScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const onLoginTap = async () => {
        if (email && password) {
            try {
                setIsLoading(true);
                setError("");
                await login(email, password);
                navigation.navigate("Home");
            } catch (err) {
                setError("Invalid credentials");
            } finally {
                setIsLoading(false);
            }
        } else {
            setError("Please fill in all fields");
        }
    };

    return (
        <scrollView className="p-4">
            <stackLayout className="p-4">
                <label className="text-2xl font-bold text-center mb-8">Loan Lead App</label>
                
                {error ? <label className="text-red-500 mb-4">{error}</label> : null}
                
                <textField
                    className="input mb-4 p-4"
                    hint="Email"
                    keyboardType="email"
                    text={email}
                    editable={!isLoading}
                    onTextChange={(args: EventData) => setEmail(args.object.get("text"))}
                />
                
                <textField
                    className="input mb-4 p-4"
                    hint="Password"
                    secure={true}
                    text={password}
                    editable={!isLoading}
                    onTextChange={(args: EventData) => setPassword(args.object.get("text"))}
                />
                
                <button
                    className="btn btn-primary p-4"
                    text={isLoading ? "Logging in..." : "Login"}
                    onTap={onLoginTap}
                    isEnabled={!isLoading}
                />
            </stackLayout>
        </scrollView>
    );
}