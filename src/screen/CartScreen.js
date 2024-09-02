import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext } from "react";

import CartCard from "../components/CartCard";
import { fonts } from "../utils/fonts";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const { cartItems, deleteCartItem, totalPrice, updateCartItemQuantity } =
    useContext(CartContext);
  const navigation = useNavigation();
  const handleDeleteItem = async (id) => {
    await deleteCartItem(id);
  };
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

        <Text style={styles.titleCartText}>My Cart</Text>
        <Text>{null}</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartCard
            item={item}
            handleDelete={handleDeleteItem}
            updateCartItemQuantity={updateCartItemQuantity}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 40, paddingBottom: 200 }}
        ListFooterComponent={
          cartItems.length !== 0 ? (
            <>
              <View style={styles.bottomContentContainer}>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Total:</Text>
                  <Text style={styles.priceText}>${totalPrice}</Text>
                </View>
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Shipping:</Text>
                  <Text style={styles.priceText}>$0.0</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.flexRowContainer}>
                  <Text style={styles.titleText}>Grand Total:</Text>
                  <Text style={[styles.priceText, styles.grandPriceText]}>
                    ${totalPrice}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </>
          ) : null
        }
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
  },
  titleCartText: {
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
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "600",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
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
  },
});
