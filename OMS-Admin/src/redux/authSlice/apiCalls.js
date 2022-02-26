import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { loginStart, loginSuccess, loginFailure } from "./index";

const apiurl = "http://localhost:8080/api/login/";

export const login = async (user, dispatch) => {
	dispatch(loginStart());
	try {
		const { data } = await axios.post(apiurl, user);
		console.log("HERE");
		
		const decodeData = jwt_decode(data.data);
		if (!decodeData.isAdmin) {
			toast.error("You don't have access");
			dispatch(loginFailure());
			return;
		}
		toast.success(data.message);
		dispatch(loginSuccess({ ...decodeData, token: data.data }));
		window.location = "/";
	} catch (error) {
		dispatch(loginFailure());
		if (error.response.status >= 400 && error.response.status < 500) {
			toast.error(error.response.data.message);
		}
	}
};
