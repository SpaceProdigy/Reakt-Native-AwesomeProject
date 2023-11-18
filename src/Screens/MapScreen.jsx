import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GOOGLE_API_KEY } from "@env";
import { View, StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";
import Loader from "../utility/Loader";

export default function MapScreen({ route }) {
  const [coordinates, setCoordinates] = useState(null);
  const { location } = route.params;
  const mapRef = useRef(null);

  const getCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`
      );
      const { results } = response.data;

      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ latitude: lat, longitude: lng });
      } else {
        setCoordinates(null);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    if (location) {
      getCoordinates();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {coordinates ? (
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={{
            ...coordinates,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel={1}
          showsUserLocation={true}
          zoomControlEnabled={true}
        >
          <Marker
            title="I am here"
            coordinate={coordinates}
            description="Hello"
          />
        </MapView>
      ) : (
        <Loader />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  mapStyle: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
});
