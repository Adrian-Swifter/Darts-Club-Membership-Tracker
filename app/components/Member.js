import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { app } from "../firebase/FirebaseConfig";
import emailjs from "emailjs-com";
import Icon from "react-native-vector-icons/FontAwesome";

function Member({ users, navigation }) {
  const [meseci, setMeseci] = useState([]);
  const [placeniMeseci, setPlaceniMeseci] = useState([]);
  const date = new Date();

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

  //left my email for testing, replace later with custom email variable
  const sendEmails = (name, clanarina, email, placeniM) => {
    const dug = clanarina * (meseci.length - placeniM);

    const emailMsg =
      dug > 0
        ? `Vaš dug za članarnu iznosi ${dug} dinara. Molimo Vas da što pre regulišete neizmirene obaveze kod blagajnika kluba, Mihaila Krgovića.`
        : `Vaš dug za članarnu iznosi ${dug} dinara. Hvala Vam što izmirujete svoje obaveze prema klubu na vreme!`;

    emailjs.send(
      "service_38oag4a",
      "template_37z1m5n",
      {
        to_name: name,
        message: emailMsg,
        from_name: "Pikado Klub Matadori",
        clanarina,
        to_email: "milosdraskovic1282@gmail.com",
      },
      "user_hX3wFmVChin8yt31lXPte"
    );
  };

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

              <TouchableOpacity
                onPress={() =>
                  sendEmails(
                    user.imePrezime,
                    user.visinaClanarine,
                    user.email,
                    placeniMeseci[userIndex].platio.length
                  )
                }
                style={{
                  backgroundColor: "dodgerblue",
                  padding: 7,
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "white", marginRight: 5, fontWeight: "600" }}>
                  Članarina
                </Text>
                <Icon name="bell" size={20} color="gold" />
              </TouchableOpacity>
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
