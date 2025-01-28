import React from 'react';
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
// import TabNavigator from "./TabNavigator";


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
            {/*<Stack.Screen*/}
            {/*    name="TabNavigator"*/}
            {/*    component={TabNavigator}*/}
            {/*    options={{ headerShown: false }}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
};

export default AppNavigator;