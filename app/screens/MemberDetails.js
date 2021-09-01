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

function MemberDetails({ route }) {
  const months = require("../Months.json");

  //const [months, setMonths] = useState({});
  console.log(months);

  const { user } = route.params;
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.flexContainer}>
          <View>
            <Image
              style={styles.image}
              source={require("../assets/user.png")}
            />
          </View>
          <View>
            <Text>
              <Text style={styles.boldText}>Ime:</Text> {user.name}
            </Text>
            <Text>
              <Text style={styles.boldText}>Email:</Text> {user.email}
            </Text>
            <Text>
              <Text style={styles.boldText}>Članarina:</Text> {user.phone}
            </Text>
          </View>
        </View>
        {/* {Meseci} */}
        <View style={styles.monthsContainer}>
          {months.map((month) => (
            <View key={month.abbreviation} style={styles.monthWrapper}>
              <Text>{month.name}</Text>
              <TouchableOpacity style={styles.iconWrapper}>
                <Icon
                  style={styles.icon}
                  name="remove"
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
    backgroundColor: true ? "tomato" : "#00ff00",
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
