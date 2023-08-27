import React, { useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../../data/dataArrays";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseApp } from "../../utils/firebaseInit"; // Adjust the path based on your directory structure

export default function CreateRecipeScreen(props) {
  const { navigation } = props;

  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState(categories[0]?.name || "");
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateInputs = () => {
    return recipeTitle && description && time && category && ingredients;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      Alert.alert("Input Error", "Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    const newRecipe = {
      title: recipeTitle,
      description,
      time,
      category,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
    };

    const db = getFirestore(firebaseApp);

    try {
      const docRef = await addDoc(collection(db, "recipes"), newRecipe);
      console.log("Recipe added with ID: ", docRef.id);
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      console.error("Error adding recipe: ", err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
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
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: "red",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
