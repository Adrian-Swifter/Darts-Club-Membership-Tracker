import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Homepage from "./app/screens/Homepage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddMember from "./app/screens/AddMember";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Add Member" component={AddMember} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
