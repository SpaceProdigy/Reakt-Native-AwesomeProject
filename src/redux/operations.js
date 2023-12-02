import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth, db, signOutUser } from "../../config";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const writeDataToFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const authStateChanged = async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

export const actualAuth = createAsyncThunk(
  "auth/actualAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authStateChanged();
      if (user) {
        const {
          accessToken,
          phoneNumber,
          photoURL,
          emailVerified,
          email,
          displayName,
          isAnonymous,
          uid,
        } = user;

        return {
          accessToken,
          phoneNumber,
          photoURL,
          emailVerified,
          email,
          displayName,
          isAnonymous,
          uid,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      await updateProfile(auth.currentUser, {
        displayName: userData.login ? userData.login : null,
        photoURL: userData.photoURL ? userData.photoURL : null,
      });

      const {
        accessToken,
        phoneNumber,
        photoURL,
        emailVerified,
        email,
        displayName,
        isAnonymous,
        uid,
      } = user;
      return {
        accessToken,
        phoneNumber,
        photoURL,
        emailVerified,
        email,
        displayName,
        isAnonymous,
        uid,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.code);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const {
        accessToken,
        phoneNumber,
        photoURL,
        emailVerified,
        email,
        displayName,
        isAnonymous,
      } = user;
      return {
        accessToken,
        phoneNumber,
        photoURL,
        emailVerified,
        email,
        displayName,
        isAnonymous,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.code);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistToken = state.auth.token;
    if (persistToken === null) {
      return rejectWithValue();
    }
    token.set(persistToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOutUser();

      return;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", contact);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ currentId, data }, { rejectWithValue }) => {
    try {
      const respons = await axios.patch(`/contacts/${currentId}`, data);
      return respons.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
