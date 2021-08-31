import React from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Member from "../components/Member";
import Header from "../components/Header";
function Homepage(props) {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/matador.png")}
          resizeMode="contain"
        />
        <Header {...props} />

        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
      </SafeAreaView>
    </ScrollView>
  );
}

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.15,
  },
});
