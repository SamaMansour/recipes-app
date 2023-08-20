import React, { useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CreateRecipeScreen(props) {
  const { navigation } = props;

  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = () => {
    const newRecipe = {
      title: recipeTitle,
      description,
      time,
      category,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
    };
    console.log(newRecipe);
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
          <Picker.Item label="Dessert" value="dessert" />
          <Picker.Item label="Main Course" value="mainCourse" />
          {/* Add more categories as needed */}
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
