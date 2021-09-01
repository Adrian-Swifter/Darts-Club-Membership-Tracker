import React from "react";
import { Text, View } from "react-native";

function MemberDetails({route}) {
    const {user} = route.params
  return (
    <View>
      <Text>{user.name}</Text>
    </View>
  );
}

export default MemberDetails;
