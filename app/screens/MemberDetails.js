import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { app } from "../firebase/FirebaseConfig";

function MemberDetails({ route }) {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    app
      .firestore()
      .collection("years")
      .onSnapshot((mondata) => {
        const monarr = [];
        mondata.forEach((snapshot) => {
          monarr.push({ ...snapshot.data() });
        });
        //snapshot data je vracao array sa jednim objektom i zato ovaj hack da bi napravili itterable array od meseci
        let finalarr = [];
        monarr.forEach((mon) => {
          for (const [id, month] of Object.entries(mon)) {
            finalarr.push({ ...id, ...month });
          }
          setMonths(finalarr);
        });
      });
  }, []);
  console.log(months);
  const { user } = route.params;
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.flexContainer}>
          <View>
            <Image
              style={styles.image}
              source={
                user.url ? { uri: user.url } : require("../assets/user.png")
              }
            />
          </View>
          <View>
            <Text>
              <Text style={styles.boldText}>Ime:</Text> {user.imePrezime}
            </Text>
            <Text>
              <Text style={styles.boldText}>Email:</Text> {user.email}
            </Text>
            <Text>
              <Text style={styles.boldText}>Članarina:</Text>{" "}
              {user.visinaClanarine}
            </Text>
          </View>
        </View>
        {/* {Meseci} */}
        <View style={styles.monthsContainer}>
          {months.map((month, index) => (
            <View key={index} style={styles.monthWrapper}>
              <Text>{month[0]}</Text>
              <TouchableOpacity style={styles.iconWrapper}>
                <Icon
                  style={styles.icon}
                  name={month[1] ? "check" : "remove"}
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default MemberDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingTop: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  image: {
    width: 60,
    height: 60,
  },
  iconWrapper: {
    backgroundColor: false ? "tomato" : "#00ff00",
    padding: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  monthsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 40,
  },
  monthWrapper: {
    width: "33%",
    alignItems: "center",
  },
});
