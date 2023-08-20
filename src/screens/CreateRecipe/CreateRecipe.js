import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";

const { width: viewportWidth } = Dimensions.get("window");

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
    // TODO: Store the recipe or do something else with it
    console.log(newRecipe);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoRecipeContainer}>
        <TextInput
          placeholder="Recipe Title"
          style={styles.input}
          value={recipeTitle}
          onChangeText={setRecipeTitle}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="Time (e.g., '15 minutes')"
          style={styles.input}
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          placeholder="Category (e.g., 'Dessert')"
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          placeholder="Ingredients (comma separated)"
          style={styles.input}
          value={ingredients}
          onChangeText={setIngredients}
        />
        <Button title="Submit Recipe" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}
