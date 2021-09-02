import React from "react";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Member from "../components/Member";
import Header from "../components/Header";

function Homepage(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/matador.png")}
          resizeMode="contain"
        />
        <Header {...props} />

        <Member users={users} {...props} />
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
    opacity: 0.15,
    position: "absolute",
  },
});
