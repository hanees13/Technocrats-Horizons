import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../utils/fonts";

const CartCard = ({ item, handleDelete,updateCartItemQuantity }) => {
 
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
       <View style={styles.QuantityContainer}>
       <TouchableOpacity onPress={()=>{updateCartItemQuantity(item.id, "decrement")}} style={styles.IncrementContainer}>
        <Text style={styles.quantityText}>-</Text>
       </TouchableOpacity>
       <Text style={styles.quantityText}>{item.quantity}</Text>
       <TouchableOpacity onPress={()=>{updateCartItemQuantity(item.id, "increment")}} style={styles.IncrementContainer}>
        <Text style={styles.quantityText}>+</Text>
       </TouchableOpacity>
       </View>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Image
          source={require("../assets/deleteIcon.png")}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 15,
  },
  image: {
    height: 125,
    width: "30%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: fonts.medium,
    color: "#444444",
  },
  price: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: "#797979",
    marginVertical: 7,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 5,
  },
  circle: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  sizeContainer: {
    backgroundColor: "#FFFFFF",
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: fonts.regular,
  },
  textCircleContainer: {
    flexDirection: "row",
  },
  deleteIcon: {
    height: 30,
    width: 30,
    marginTop: 10,
    tintColor: '#FF0000'
  },
  QuantityContainer:{
    width: 70,
    height: 30,
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius:10,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingHorizontal: 5
  },
  IncrementContainer:{
   
    width:20,
    alignItems: 'center',
    justifyContent:'center'
  }
});
