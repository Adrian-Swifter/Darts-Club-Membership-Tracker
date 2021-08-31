import React from "react";
import { View, Image, Text, Button, StyleSheet } from "react-native";

function Member(props) {
  const btn = () => {
    alert("test");
  };
  return (
    <View style={styles.layout}>
      <View>
        <Image style={styles.image} source={require("../assets/user.png")} />
      </View>
      <View>
        <Text style={styles.text}>Ime i Prezime</Text>
        <Button
          onPress={btn}
          title="Detalji"
          color="dodgerblue"
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
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
    width: "90%",
    margin: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    borderRadius: 7,
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    opacity: 0.3
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
});
