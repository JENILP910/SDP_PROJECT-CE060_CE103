import { createSlice } from "@reduxjs/toolkit";

export const likesSlice = createSlice({
	name: "likes",
	initialState: {
		likes: Number,
		getLikesProgress: false,
		error: false,
	},
	reducers: {
		getLikesStart: (state) => {
			state.getLikesProgress = true;
		},
		getLikesSuccess: (state, action) => {
			state.likes = action.payload;
			// console.log(state.likes)
			state.getLikesProgress = false;
		},
		getLikesFailure: (state) => {
			state.error = true;
			state.getLikesProgress = false;
		},
	},
});

export const {
	getLikesStart,
	getLikesSuccess,
	getLikesFailure,
} = likesSlice.actions;

export default likesSlice.reducer;
