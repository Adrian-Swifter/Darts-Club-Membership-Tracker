import React from "react";
import {
  Image,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Header({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 10,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 7
        }}
      >
        <Image style={styles.logo} source={require("../assets/PFS.jpg")} />
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Add Member")}>
          <Icon style={styles.icon} name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 20,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 7,
  },
  icon: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 7,
  },
});
