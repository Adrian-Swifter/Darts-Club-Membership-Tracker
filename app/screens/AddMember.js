import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Formik } from "formik";
import { app } from "../firebase/FirebaseConfig";
import * as DocumentPicker from "expo-document-picker";
import * as Progress from "react-native-progress";

function AddMember(props) {
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);

  const openDocumentFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "image/jpeg",
    });
    setFile(res.file);
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ imePrezime: "", email: "", visinaClanarine: "" }}
        onSubmit={(values) => {
          const storageRef = app.storage().ref();
          const fileRef = storageRef.child(`images/` + file.name);

          const collRef = app.firestore().collection("members");
          fileRef.put(file).on(
            "state_changed",
            (snapshot) => {
              let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(percentage);
            },
            (error) => {
              console.log(error);
            },
            async () => {
              const url = await fileRef.getDownloadURL();
              collRef.add({ url, ...values });
            }
          );
        }}
      >
        {(props) => (
          <View style={{ width: "90%" }}>
            <TextInput
              style={styles.input}
              placeholder="Ime i Prezime"
              onChangeText={props.handleChange("imePrezime")}
              value={props.values.imePrezime}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <TextInput
              style={styles.input}
              placeholder="Visina Članarine"
              onChangeText={props.handleChange("visinaClanarine")}
              value={props.values.visinaClanarine}
            />
            <TouchableOpacity
              onPress={() => openDocumentFile()}
              style={{
                padding: 10,
                backgroundColor: "lightgrey",
                marginBottom: 20,
              }}
            >
              <Text>Select Image</Text>
            </TouchableOpacity>
            <Text style={{ marginBottom: 20 }}>{file.name}</Text>
            <Button
              title="submit"
              color="dodgerblue"
              onPress={props.handleSubmit}
            />

            <Progress.Bar
              style={{ marginTop: 20 }}
              progress={progress}
              width={null}
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
    alignItems: "center",
  },
  input: {
    padding: 10,
  },
});
