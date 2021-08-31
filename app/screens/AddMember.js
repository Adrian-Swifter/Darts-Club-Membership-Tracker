import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Formik } from "formik";

function AddMember(props) {
  return (
    <View>
      <Formik
        initialValues={{imePrezime: '', email: '', visinaClanarine: 0}}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {(props) => (
          <View>
            <TextInput 
              placeholder="Ime i Prezime"
              onChangeText={props.handleChange('imePrezime')}
              value={props.values.imePrezime}
            />
            <TextInput 
              placeholder="Email"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
            />
            <TextInput 
              placeholder="Visina Članarine"
              onChangeText={props.handleChange('visinaClanarine')}
              value={props.values.visinaClanarine}
            />

            <Button 
              title="submit"
              color="gold"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default AddMember;
