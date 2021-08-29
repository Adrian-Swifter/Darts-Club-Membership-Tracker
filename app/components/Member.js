import React from "react";
import { View, Image, Text, Button, StyleSheet } from "react-native";

function Member(props) {
  const btn = () => {
    alert("test");
  };
  return (
    <View style={styles.layout}>
      <View>
        <Image source={require("../assets/user.png")} />
      </View>
      <View>
        <Text>Ime i Prezime</Text>
        <Button
          onPress={btn}
          title="Detalji"
          color="#841584"
          accessibilityLabel="Detalji o clanu pikado kluba"
        />
      </View>
    </View>
  );
}

export default Member;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.7)",
    width: "90%",
  },
});
