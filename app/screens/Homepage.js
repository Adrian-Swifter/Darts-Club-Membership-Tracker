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
import { app } from "../FirebaseConfig";

function Homepage(props) {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection("members")
      .onSnapshot((memdata) => {
        const memarr = [];
        memdata.forEach((snapshot) => {
          memarr.push({...snapshot.data()});
        });
        setMembers(memarr);
      })
      
  }, []);
  console.log(members);
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/matador.png")}
          resizeMode="contain"
        />
        <Header {...props} />
        
        <Member users={members} {...props} />
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
