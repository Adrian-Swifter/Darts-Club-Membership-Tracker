import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Header({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/PFS.jpg")} />
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Add Member")}>
          <Icon name="plus" size={30} color="black" />
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
  },
  logo: {
    width: 30,
    height: 30,
  },
});
