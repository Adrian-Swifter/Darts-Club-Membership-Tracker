import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Homepage from "./app/screens/Homepage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddMember from "./app/screens/AddMember";
import MemberDetails from "./app/screens/MemberDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Add Member" component={AddMember} />
        <Stack.Screen name="Member Details" component={MemberDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
