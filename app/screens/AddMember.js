import React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Formik } from "formik";
import { app } from "../FirebaseConfig";
import * as DocumentPicker from "expo-document-picker";

function AddMember(props) {
  const addMembersToFirestore = (values) => {
    app
      .firestore()
      .collection("members")
      .add({ ...values });
  };

  const openDocumentFile = () => {
    const res = DocumentPicker.getDocumentAsync({
      type: "image/jpeg",
    });
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ imePrezime: "", email: "", visinaClanarine: "" }}
        onSubmit={(values) => {
          addMembersToFirestore(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder="Ime i Prezime"
              onChangeText={props.handleChange("imePrezime")}
              value={props.values.imePrezime}
            />
            <TextInput
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <TextInput
              placeholder="Visina Članarine"
              onChangeText={props.handleChange("visinaClanarine")}
              value={props.values.visinaClanarine}
            />
            <TouchableOpacity
              onPress={() => openDocumentFile()}
              style={{
                padding: 10,
                width: "80%",
                alignItems: "center",
                backgroundColor: "red",
              }}
            >
              <Text>Select Image</Text>
            </TouchableOpacity>
            <Button
              title="submit"
              color="dodgerblue"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default AddMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
