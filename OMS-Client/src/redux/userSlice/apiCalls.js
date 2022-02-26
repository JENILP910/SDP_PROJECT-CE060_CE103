import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import * as actions from "./index";
const key = require('../../key');

const apiUrl = key.apiurl;

export const getUser = async (payload, dispatch) => {
	dispatch(actions.getUserStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + `/users/${payload}`);
		dispatch(actions.getUserSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};

export const updateUser = async (payload, dispatch) => {
	dispatch(actions.updateUserStart());
	try {
		const url = apiUrl + `/users/${payload.id}`;
		const { data } = await axiosInstance.put(url, payload.data);
		dispatch(actions.updateUserSuccess(data.data));
		toast.success(data.message);
		// toast.error(data.message);
		return true;
	} catch (error) {
		dispatch(actions.getUserFailure());
		return false;
	}
};

export const islikeSong = (payload) => {
	// dispatch(actions.islikeSong(false));
	try {
		console.log("PLZ");
		const { data } = axiosInstance.put(apiUrl + `/songs/like/${payload}`);
		actions.islikeSong(data.isliked);
		// dispatch(actions.likeSongSuccess(payload));
		// toast.success(data.message);
		console.log(data.isliked);
		return data.isliked;
	} catch (error) {
		actions.likeSongFailure();
		return false;
	}
};

export const likeSong = async (payload, dispatch) => {
	dispatch(actions.likeSongStart());
	try {
		const { data } = await axiosInstance.put(apiUrl + `/songs/like/${payload}`);
		dispatch(actions.likeSongSuccess(payload));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.likeSongFailure());
		return false;
	}
};

export const getLikedSongs = async (payload, dispatch) => {

}
