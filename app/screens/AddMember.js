import React from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { app } from "../FirebaseConfig";
function AddMember(props) {

  const addMembersToFirestore = (values) => {
    app
    .firestore()
    .collection("members")
    .add({...values})
  }

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
