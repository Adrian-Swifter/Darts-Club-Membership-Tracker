import React from "react";
import { ImageBackground, StyleSheet, View, Button } from "react-native";
import Member from "../components/Member";

function Homepage(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/matador.png")}
        resizeMode="contain"
      />

      <Member />
      <Member />
      <Member />
      <Button
        title="Add Member"
        onPress={() => props.navigation.navigate('Add Member')}
      />
    </View>
  );
}

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.15,
  },
});
