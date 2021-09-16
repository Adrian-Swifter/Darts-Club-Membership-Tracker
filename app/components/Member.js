import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { app } from "../firebase/FirebaseConfig";

function Member({ users, navigation }) {
  const [meseci, setMeseci] = useState([]);
  const [placeniMeseci, setPlaceniMeseci] = useState([]);
  const date = new Date();
  console.log(date.getMonth());
  useEffect(() => {
    app
      .firestore()
      .collection("years")
      .doc("2020")
      .get()
      .then((mondata) => {
        const mesecidata = mondata.data();
        setMeseci(mesecidata.meseci);
      });
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection("2021")
      .onSnapshot((udata) => {
        const userDataArr = [];
        udata.forEach((userData) => {
          userDataArr.push({ ...userData.data(), id: userData.id });
        });
        setPlaceniMeseci(userDataArr);
      });
  }, []);

  meseci.length = date.getMonth() + 1;

  return (
    <View style={styles.layout}>
      {users.map((user, userIndex) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Member Details", {
              user: user,
            })
          }
          key={user.email}
          style={styles.memberRow}
        >
          <View>
            <Image
              style={user.url ? styles.image : [styles.image, { opacity: 0.3 }]}
              source={
                user.url ? { uri: user.url } : require("../assets/user.png")
              }
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.iconContainer}>
              <Text style={styles.text}>{user.imePrezime}</Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {meseci
                  .filter(
                    (mesec) =>
                      placeniMeseci[userIndex].platio.indexOf(mesec) < 0
                  )
                  .map((mesec) => (
                    <Text
                      key={mesec}
                      style={{
                        backgroundColor: "tomato",
                        color: "white",
                        paddingHorizontal: 5,
                        fontWeight: "600",
                        borderRadius: 3,
                        margin: 2,
                        fontSize: 12,
                      }}
                    >
                      {mesec.substring(0, 3)}
                    </Text>
                  ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Member;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  memberRow: {
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
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  iconContainer: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  icon: {
    paddingTop: 10,
  },
});
