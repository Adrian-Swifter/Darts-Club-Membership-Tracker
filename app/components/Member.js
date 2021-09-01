import React from "react";
import { View, Image, Text, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Member(props) {
  const btn = () => {
    alert("test");
  };
  return (
    <View style={styles.layout}>
      <View>
        <Image style={styles.image} source={require("../assets/user.png")} />
      </View>
      <View style={styles.iconContainer} >
        <Text style={styles.text}>Ime i Prezime</Text>
        <Icon style={styles.icon} name="chevron-right" size={20} color="dodgerblue" />
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
    backgroundColor: "white",
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
  iconContainer: {
    alignItems: "flex-end"
  },
  icon: {
    paddingTop: 10
  }
});
