import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";


import { fonts } from "../utils/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";

import { CartContext } from "../context/CartContext";

const ProductDetailsScreen = () => {
  const { addToCartItem, cartItems } = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.item;
  const width = Dimensions.get("window").width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  const handleAddToCart = () => {
    addToCartItem(product);
    navigation.navigate("CART");
  };
  //product horizontal scroll product card
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "red",
          alignSelf: "center",
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };
  console.log(" product.images  >>>>>>>>", product.images.length);
  const checkInCart = cartItems.some((item) => item.id === product.id);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../assets/arrowback.png")}
            style={styles.appBackIcon}
          />
        </TouchableOpacity>

        <Text style={styles.titleText}>{product.brand}</Text>
        <Text>{null}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.imageContainer}>
          <FlatList
            data={product.images ? product.images : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
            }}
          >
            {product.images
              ? product.images.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: "clamp",
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: "16%",
                        height: 2.4,
                        backgroundColor: "#111111",
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.fontText}>{product.title}</Text>
          <Text style={styles.fontText}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          {/* cart button */}
          <View>
            {checkInCart ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CART");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Go to cart</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                <Image
                  source={require("../assets/focused/shopping_cart.png")}
                  style={styles.cartIcon}
                />

                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontFamily: fonts.regular,
    color: "#000000",
    right: 12,
  },
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
    tintColor: "#444444",
  },
  cartIcon: {
    height: 20,
    width: 20,
    tintColor: "#444444",
  },
  imageContainer: {
    height: 420,
    width: "100%",
    marginTop: 15,
  },

  contentContainer: {
    padding: 20,
  },

  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#111111",
    textAlign: "left",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#fff",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#444444",
    fontWeight: "700",
    fontFamily: fonts.regular,
    left: 5,
  },
});
