import {
  addPhotosToFirestor,
  fetchPhotosToFirestor,
  addCommentsToFirestor,
  fetchCommentsToFirestor,
  deleteCommentsToFirestor,
  addLikeToFirestor,
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
        state.comments = action.payload.mappedData;
      })
      .addCase(deleteCommentsToFirestor.pending, handlePending)
      .addCase(deleteCommentsToFirestor.rejected, handleRejected)
      .addCase(deleteCommentsToFirestor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        const index = state.comments.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.comments.splice(index, 1);
        }
        const indexComment = state.items.findIndex(
          (item) => item.id === action.payload.photoId
        );
        if (indexComment !== -1) {
          state.items[indexComment].comments = action.payload.comments;
        }
      })
      .addCase(addLikeToFirestor.pending, handlePending)
      .addCase(addLikeToFirestor.rejected, handleRejected)
      .addCase(addLikeToFirestor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;

        const indexComment = state.items.findIndex(
          (item) => item.id === action.payload.photoId
        );

        if (indexComment !== -1) {
          state.items[indexComment].likes = action.payload.currentLikes;
        }
      }),
});

export const picturesReducer = picturesSlice.reducer;

export const selectPictures = (state) => state.pictures.items;
export const selectComments = (state) => state.pictures.comments;
export const selectIsLoading = (state) => state.pictures.isLoading;
