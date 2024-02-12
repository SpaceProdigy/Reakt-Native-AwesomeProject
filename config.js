// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Функція для підключення авторизації в проект
import { getAuth, signOut } from "firebase/auth";

// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAM9AO2z8uyy32L_8BQkNRdFoPy21YZN6o",
  authDomain: "imposing-union-405014.firebaseapp.com",
  databaseURL:
    "https://imposing-union-405014-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "imposing-union-405014",
  storageBucket: "imposing-union-405014.appspot.com",
  messagingSenderId: "956545837906",
  appId: "1:956545837906:web:d80ea6ab57efa84c63688b",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const signOutUser = () => signOut(auth);
export const db = getFirestore(app);
export const storage = getStorage(app);
