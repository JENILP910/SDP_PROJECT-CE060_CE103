import axiosInstance from "../axiosInstance";
// import { toast } from "react-toastify";
import * as actions from "./index";
const key = require('../../key');

const apiUrl = key.apiurl;
// const apiUrl = process.env.REACT_APP_API_URL;

export const getlikes = async (payload, dispatch) => {
	dispatch(actions.getLikesStart());
	try {
		const { data } = await axiosInstance.get(apiUrl + `/users/${payload}/` + true);
		dispatch(actions.getLikesSuccess(data.likes));
		// console.log("LIKES~");
		// console.log(data.likes);
		return true;
	} catch (error) {
		// console.log("Nooooooo");
		// console.log(error);
		dispatch(actions.getLikesFailure());
		return false;
	}
};
