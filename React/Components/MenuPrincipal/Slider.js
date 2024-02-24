import React from "react";
import { ScrollView, Image, StyleSheet, View , Dimensions} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


export default function Slider() {
  const images = [
    "https://www.cnci.edu.mx/public/uploads/2018/11/23/puntualidad.jpg",
    "https://photomkt.com/wp-content/uploads/2019/01/1-1.png",
    "https://puntual.com/blog/wp-content/uploads/ANUNCIO-FUNDESEM.gif",
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <Image key={index} style={styles.image} source={{ uri: image }} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.800,
    height: height * 0.170,
    margin: height * 0.010,
    resizeMode:'stretch',
    borderRadius: 10,
  },
});
