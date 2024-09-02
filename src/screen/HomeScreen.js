import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";


import ProductCard from "../components/ProductCard";
import useFetchProducts from "../data/useFetchProducts";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { products, isLoading, error } = useFetchProducts();
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#ffff" />;
  }
  const filteredProductData = search
    ? products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : products;
  return (
    <View  style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.headingText}>
              Discover Sustainable Products
            </Text>
            <View style={styles.inputContainer}>
              <Image
                source={require("../assets/search.png")}
                style={styles.searchIcon}
              />
              <TextInput
                value={search}
                onChangeText={(text) => {
                  console.log(text);
                  setSearch(text);
                }}
                placeholder="Search.."
                style={styles.textInput}
              />
            </View>
          </View>
        }
        data={filteredProductData}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard item={item} handleProductClick={handleProductDetails} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <View></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor:'#F6F6F6',
    padding: 20,
  },

  headingText: {
    fontSize: 18,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
});
