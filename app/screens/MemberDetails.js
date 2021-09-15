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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { app } from "../firebase/FirebaseConfig";
import firebase from "firebase/app";
import { Picker } from "@react-native-picker/picker";

function MemberDetails({ route }) {
  const { user } = route.params;
  const [months, setMonths] = useState([]);
  const [platioData, setPlatioData] = useState([]);
  const date = new Date();
  const currentYear = date.getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    app
      .firestore()
      .collection("years")
      .doc("2020")
      .get()
      .then((mondata) => {
        const mesecidata = mondata.data();
        setMonths(mesecidata.meseci);
      });
  }, []);

  useEffect(() => {
    const unsub = app
      .firestore()
      .collection(JSON.stringify(year))
      .doc(user.id)
      .onSnapshot((paidMonts) => {
        const paidMonthsArr = paidMonts.data();
        if (paidMonthsArr) {
          setPlatioData(paidMonthsArr.platio);
        } else {
          setPlatioData([]);
        }
        setIsLoading(false);
      });
    return () => unsub();
  }, [year]);

  useEffect(() => {
    app
      .firestore()
      .collection("years")
      .get()
      .then((ydata) => {
        const yearsArr = [];
        ydata.forEach((snap) => {
          yearsArr.push(snap.id);
        });
        setYears(yearsArr);
        setIsLoading(false);
      });
  }, []);

  const clanPlatioClanarinu = (mesec) => {
    Alert.alert(
      "Potvrda",
      `Da li ste sigurni da je ${user.imePrezime} platio clanarinu za mesec ${mesec}, ${year}-e godine?`,
      [
        {
          text: "Poništi",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Da",
          onPress: () => {
            app
              .firestore()
              .collection(JSON.stringify(year))
              .doc(user.id)
              .set(
                {
                  platio: firebase.firestore.FieldValue.arrayUnion(mesec),
                },
                { merge: true }
              );
          },
        },
      ]
    );
  };

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

        <View style={{ alignItems: "center", width: 100, marginTop: 20 }}>
          <Picker
            style={{ flex: 1, width: "100%" }}
            selectedValue={JSON.stringify(year)}
            onValueChange={(yearValue) =>
              setYear(Number(yearValue), setIsLoading(true))
            }
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            <View style={styles.monthsContainer}>
              {months.map((month, index) => (
                <View key={index} style={styles.monthWrapper}>
                  <Text>{month}</Text>
                  <TouchableOpacity
                    onPress={() => clanPlatioClanarinu(month)}
                    style={[
                      styles.iconWrapper,
                      {
                        backgroundColor: platioData.includes(month)
                          ? "#00ff00"
                          : "tomato",
                      },
                    ]}
                  >
                    <Icon
                      style={styles.icon}
                      name={platioData.includes(month) ? "check" : "remove"}
                      size={50}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

export default MemberDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
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
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  iconWrapper: {
    padding: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
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
