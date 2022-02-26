import axiosInstance from "../axiosInstance";
import * as actions from "./index";
import key from "../../key"

const apiurl = key.apiurl;

export const getAllPlaylists = async (dispatch) => {
	dispatch(actions.getAllPlaylistsStart());
	try {
		const { data } = await axiosInstance.get( apiurl + "/playlists/a");
		dispatch(actions.getAllPlaylistsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllPlaylistsFailure());
		return false;
	}
};
