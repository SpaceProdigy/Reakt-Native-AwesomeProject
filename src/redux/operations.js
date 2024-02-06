import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const metadata = {
  contentType: "image/jpeg",
};

import { auth, db, signOutUser, storage } from "../../config";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

export const deleteCommentsToFirestor = createAsyncThunk(
  "fireStore/deleteCommentsToFirestor",
  async (data, { rejectWithValue }) => {
    try {
      await deleteDoc(
        doc(
          db,
          "users",
          data.uid,
          "photos",
          data.photoID,
          "comments",
          data.idComment
        )
      );
      console.log("first step");
      const querySnapshot = await getDocs(
        query(
          collection(db, "users", data.uid, "photos", data.photoId, "comments"),
          orderBy("date", "desc")
        )
      );
      console.log("querySnapshot", querySnapshot);
      const mappedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("MAOD", mappedData);
      const ref = doc(db, "users", data.uid, "photos", data.photoId);

      await updateDoc(ref, {
        comments: mappedData.length,
      });
      console.log("FILE DELETE");
      return {
        idComment: data.idComment,
        photoId: data.photoID,
        comments: mappedData.length,
      };
    } catch (e) {
      console.error(error);
      return rejectWithValue(e.message);
    }
  }
);

export const fetchCommentsToFirestor = createAsyncThunk(
  "fireStore/fetchCommentsToFirestor",
  async (data, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users", data.id, "photos", data.photoId, "comments"),
          orderBy("date", "desc")
        )
      );
      const mappedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return mappedData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.code);
    }
  }
);

export const addCommentsToFirestor = createAsyncThunk(
  "fireStore/addCommentsToFirestor",
  async (data, { rejectWithValue }) => {
    try {
      const comment = await addDoc(
        collection(db, "users", data.uid, "photos", data.photoId, "comments"),
        data.addcomment
      );

      const querySnapshot = await getDocs(
        query(
          collection(db, "users", data.uid, "photos", data.photoId, "comments"),
          orderBy("date", "desc")
        )
      );
      const mappedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const ref = doc(db, "users", data.uid, "photos", data.photoId);

      await updateDoc(ref, {
        comments: mappedData.length,
      });

      const refComment = doc(
        db,
        "users",
        data.uid,
        "photos",
        data.photoId,
        "comments",
        comment.id
      );

      await updateDoc(refComment, {
        idComment: comment.id,
      });

      return {
        ...data.addcomment,
        comments: mappedData.length,
        photoId: data.photoId,
        idComment: comment.id,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.code);
    }
  }
);

// export const updatePhotosToFirestor = createAsyncThunk(
//   "fireStore/updatePhotosToFirestor",
//   async (data, { rejectWithValue }) => {
//     try {
//       const docRef = doc(collection(db, "users", data.uid, "photos"), data.id);

//       await updateDoc(docRef, data.updateData);
//       console.log("document updated");

//       // return mappedData;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.code);
//     }
//   }
// );

export const fetchPhotosToFirestor = createAsyncThunk(
  "fireStore/fetchPhotosToFirestor",
  async (id, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users", id, "photos"),
          orderBy("timestamp", "desc")
        )
      );

      const mappedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return mappedData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.code);
    }
  }
);

export const addPhotosToFirestor = createAsyncThunk(
  "fireStore/addPhotosToFirestor",
  async (data, { rejectWithValue }) => {
    try {
      const imagesRef = ref(storage, `${data?.uid}/${data?.photoName}`);
      const file = new File(
        [await fetch(data?.image).then((res) => res.blob())],
        data?.photoName
      );

      await uploadBytes(imagesRef, file, metadata);

      const url = await getDownloadURL(
        ref(storage, `${data.uid}/${data.photoName}`)
      );
      const currentDate = new Date().toISOString();

      const newData = {
        ...data,
        image: url,
        timestamp: currentDate,
      };

      await addDoc(collection(db, "users", data.uid, "photos"), newData);

      return newData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

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
