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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { app } from "../firebase/FirebaseConfig";

function MemberDetails({ route }) {
  const { user } = route.params;
  const [months, setMonths] = useState([]);
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  const date = new Date();
  const year = date.getFullYear();

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
          console.log(finalarr, "finalarr")
          setMonths(finalarr);
        });
      });
  }, []);

  useEffect(() => {
    app
      .firestore()
      .collection(JSON.stringify(year))
      .doc(user.id)
      .get()
      .then((data) => {
        // const newArr = [];
        // data.forEach((mdat) => {
        //   newArr.push({ ...mdat.data() });
        // });

        // setData(newArr);
     
        setData(data.data())
      });
  }, []);

  const clanPlatioClanarinu = (mesec) => {
    // Alert.alert(
    //   "Potvrda",
    //   `Da li ste sigurni da je ${user.imePrezime} platio clanarinu za mesec ${mesec}`,
    //   [
    //     {
    //       text: "Poništi",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "Da", onPress: () => {
    //       setChange(!change)
    //     }}
    //   ]
    // );
    console.log(data);
    app
      .firestore()
      .collection(JSON.stringify(year))
      .doc(user.id)
      .set({
        platio: [mesec, ...data.platio],
      });
  };
  console.log(months, "meseci");
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
              <TouchableOpacity
                onPress={() => clanPlatioClanarinu(month[0])}
                style={[
                  styles.iconWrapper,
                  { backgroundColor: change ? "#00ff00" : "tomato" },
                ]}
              >
                <Icon
                  style={styles.icon}
                  name={change ? "check" : "remove"}
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
