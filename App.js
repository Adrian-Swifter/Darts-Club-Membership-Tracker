import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Homepage from "./app/screens/Homepage";

export default function App() {
  return (
    <NavigationContainer>
      <Homepage />
    </NavigationContainer>
  );
}
