import * as Location from "expo-location";

const addressGeocoded = async (latitude, longitude) => {
  try {
    let geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (geocode && geocode.length > 0) {
      return ({ region, country } = geocode[0]);
    }
  } catch (error) {
    console.error("Помилка при отриманні адреси з геокодера:", error.message);
  }
};

export default addressGeocoded;
