import {
  addPhotosToFirestor,
  fetchPhotosToFirestor,
  addCommentsToFirestor,
  fetchCommentsToFirestor,
  deleteCommentsToFirestor,
} from "./operations";
const { createSlice } = require("@reduxjs/toolkit");

const statePictures = {
  items: [],
  comments: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const picturesSlice = createSlice({
  name: "pictures",
  initialState: statePictures,

  extraReducers: (builder) =>
    builder
      .addCase(addPhotosToFirestor.pending, handlePending)
      .addCase(addPhotosToFirestor.rejected, handleRejected)

      .addCase(addPhotosToFirestor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items.unshift(action.payload);
      })
      .addCase(fetchPhotosToFirestor.pending, handlePending)
      .addCase(fetchPhotosToFirestor.rejected, handleRejected)
      .addCase(fetchPhotosToFirestor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(addCommentsToFirestor.pending, handlePending)
      .addCase(addCommentsToFirestor.rejected, handleRejected)
      .addCase(addCommentsToFirestor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.photoId
        );
        if (index !== -1) {
          state.items[index].comments = action.payload.comments;
        }

        state.comments.unshift(action.payload);
      })
      .addCase(fetchCommentsToFirestor.pending, handlePending)
      .addCase(fetchCommentsToFirestor.rejected, handleRejected)
      .addCase(fetchCommentsToFirestor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.comments = action.payload;
      })
      .addCase(deleteCommentsToFirestor.pending, handlePending)
      .addCase(deleteCommentsToFirestor.rejected, handleRejected)
      .addCase(deleteCommentsToFirestor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        console.log("PAYLOAD", action.payload);
        const index = state.comments.findIndex(
          (item) => item.idComment === action.payload.idComment
        );
        console.log(index);
        if (index !== -1) {
          state.comments.splice(index, 1);
        }
        const indexComment = state.items.findIndex(
          (item) => item.id === action.payload.photoId
        );
        console.log(indexComment);
        if (indexComment !== -1) {
          state.items[index].comments = action.payload.comments;
        }
      }),
  //   .addCase(deleteContact.fulfilled, (state, action) => {
  //     handleFulFilledStandart(state);
  //     const index = state.items.findIndex(
  //       (task) => task.id === action.payload.id
  //     );
  //     state.items.splice(index, 1);
  //   })
  //   .addCase(editContact.fulfilled, (state, action) => {
  //     handleFulFilledStandart(state);
  //     const updatedContact = action.payload;
  //     const index = state.items.findIndex(
  //       (contact) => contact.id === updatedContact.id
  //     );

  //     if (index !== -1) {
  //       state.items.splice(index, 1, updatedContact);
  //     }
  //   }),
});

export const picturesReducer = picturesSlice.reducer;

export const selectPictures = (state) => state.pictures.items;
export const selectComments = (state) => state.pictures.comments;
export const selectIsLoading = (state) => state.pictures.isLoading;
