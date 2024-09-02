import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../utils/fonts";

const ProductCard = ({ item, handleProductClick }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.stock}>only {item.stock} left</Text>
      </View>
     
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  coverImage: {
    height: 120,
    width: "90%",
    borderRadius: 20,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 12,
    fontFamily: fonts.regular,
    fontWeight: "600",
    color: "#444444",
  },
  price: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: "#111111",
  },
  stock: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: "red",
  },
  description: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: "#111111",
    textAlign: "justify",
  },

  
});
