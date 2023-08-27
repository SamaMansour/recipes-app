import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, StyleSheet } from "react-native";

export default function SignupScreen(props) {
  const { navigation } = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const newUser = {
      username,
      email,
      password,
    };

    console.log("New user details:", newUser);
    // Add logic here to send user details to your backend
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.formGroup}>
        <Button title="Signup" onPress={handleSignup} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  formGroup: {
    marginBottom: 15,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 1,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
});
