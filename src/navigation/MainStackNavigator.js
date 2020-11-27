import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Details from "../screens/Details";
import Today from "../screens/Today";

const Stack = createStackNavigator();

function MainStackNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					gestureEnabled: true,
					headerStyle: { backgroundColor: "#007bb2" },
					headerTitleStyle: { fontWeight: "bold" },
					headerTintColor: "#f8f8f8",
					headerTitleAlign: "center",
				}}
			>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ title: "Tasks" }}
				/>
				<Stack.Screen name="Details" component={Details} />
				<Stack.Screen name="Today" component={Today} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainStackNavigator;
