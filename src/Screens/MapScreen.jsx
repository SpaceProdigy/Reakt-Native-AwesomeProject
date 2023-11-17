import React, { useState } from "react";

import { View, StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={10}
        showsUserLocation={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    position: "relative",
    height: 240,
    width: "100%",
    marginTop: 32,
    backgroundColor: "rgba(232, 232, 232, 1)",
    borderRadius: 8,
  },
  camera: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCamera: {},

  box: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  imageWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "white",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },

  flip: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  input: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    height: 50,
  },
  textNoAccess: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 10,
  },

  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 16,
  },
  textButton: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
    color: "#BDBDBD",
  },
  button: {
    marginTop: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
  },
  geolocationBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
  },
  iconMap: { marginRight: 4 },
  trashWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32,
  },
  trashBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
