import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Member({ users, navigation }) {
 
  return (
    <View style={styles.layout}>
      {users.map((user) => (
        
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
              style={user.url ? styles.image: [styles.image, {opacity: 0.3}]}
              source={user.url ? {uri: user.url} : require('../assets/user.png')}
            />
          </View>
          <View style={styles.iconContainer}>
            <Text style={styles.text}>{user.imePrezime}</Text>
            <Icon
              style={styles.icon}
              name="hand-pointer-o"
              size={20}
              color="dodgerblue"
            />
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
  },
  icon: {
    paddingTop: 10,
  },
});
