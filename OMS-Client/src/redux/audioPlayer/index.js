import { createSlice } from "@reduxjs/toolkit";

export const audioPlayer = createSlice({
	name: "audioPlayer",
	initialState: {
		currentSong: null,
	},
	reducers: {
		setCurrentSong: (state, action) => {
			state.currentSong = action.payload;
		},
		getCurrentSong: (state) => {
			return (state.currentSong);
		},
	},
});

export const { getCurrentSong, setCurrentSong } = audioPlayer.actions;

export default audioPlayer.reducer;
