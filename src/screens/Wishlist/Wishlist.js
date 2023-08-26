import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function WishlistScreen(props) {
  const { navigation } = props;

  const [recipeTitle, setRecipeTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    const newWish = {
      title: recipeTitle,
      category,
    };

    console.log("Wishlist added:", newWish);
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
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {/* Example categories - replace this with your actual categories */}
          {["Appetizers", "Main Course", "Desserts"].map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Button title="Add to Wishlist" onPress={handleSubmit} />
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
