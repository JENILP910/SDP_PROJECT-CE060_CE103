import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";
import key from "../../key"

const apiurl = key.apiurl;

export const createSong = async (song, dispatch) => {
	dispatch(actions.createSongStart());
	try {
		const { data } = await axiosInstance.post( apiurl + "/songs/c/", song);
		dispatch(actions.createSongSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.createSongFailure());
		return false;
	}
};

export const getAllSongs = async (dispatch) => {
	dispatch(actions.getAllSongsStart());
	try {
		const { data } = await axiosInstance.get( apiurl + "/songs");
		dispatch(actions.getAllSongsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllSongsFailure());
		return false;
	}
};

export const updateSong = async (id, song, dispatch) => {
	dispatch(actions.updateSongStart());
	try {
		const { data } = await axiosInstance.put( apiurl + `/songs/${id}`, song);
		dispatch(actions.updateSongSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateSongFailure());
		return false;
	}
};

export const deleteSong = async (id, dispatch) => {
	dispatch(actions.deleteSongStart());
	try {
		const { data } = await axiosInstance.delete( apiurl + `/songs/${id}`);
		dispatch(actions.deleteSongSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteSongFailure());
		return false;
	}
};
