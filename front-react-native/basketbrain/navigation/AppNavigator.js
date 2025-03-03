import React from 'react';
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MatchScreen from "../screens/MatchScreen";
import CreditScreen from "../screens/CreditScreen";
// import TabNavigator from "./TabNavigator";
import ProfileScreen from "../screens/ProfileScreen";



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#264653',
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
            <Stack.Screen
                name="Match"
                component={MatchScreen}
            />
            <Stack.Screen
                name="Credit"
                component={CreditScreen}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />
            {/*<Stack.Screen*/}
            {/*    name="TabNavigator"*/}
            {/*    component={TabNavigator}*/}
            {/*    options={{ headerShown: false }}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
};

export default AppNavigator;