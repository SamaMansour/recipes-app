import React, { useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../../data/dataArrays";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALY_L5QAVWGS_fx4oYJ8b3Fg-ni8sIELk",
  authDomain: "recipes-app-6538e.firebaseapp.com",
  databaseURL: "https://recipes-app-6538e-default-rtdb.firebaseio.com",
  projectId: "recipes-app-6538e",
  storageBucket: "recipes-app-6538e.appspot.com",
  messagingSenderId: "943409972016",
  appId: "1:943409972016:web:a0ab10c3f46f8b245b3ef5",
  measurementId: "G-RJWRPB172G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default function CreateRecipeScreen(props) {
  const { navigation } = props;

  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = async () => {
    const newRecipe = {
      title: recipeTitle,
      description,
      time,
      category,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
    };

    const db = getFirestore(app);

    try {
      const docRef = await addDoc(collection(db, "recipes"), newRecipe);
      console.log("Recipe added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Recipe Title"
          style={styles.input}
          value={recipeTitle}
          onChangeText={setRecipeTitle}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Time (e.g., '15 minutes')"
          style={styles.input}
          value={time}
          onChangeText={setTime}
        />
      </View>
      <View style={styles.formGroup}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Ingredients (comma separated)"
          style={styles.input}
          value={ingredients}
          onChangeText={setIngredients}
        />
      </View>
      <View style={styles.formGroup}>
        <Button title="Submit Recipe" onPress={handleSubmit} />
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
  picker: {
    height: 40,
    width: "100%",
  },
});
