import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";
import Homepage from "./app/screens/Homepage";

export default function App() {
  return (
    <Homepage/>
  );
}
