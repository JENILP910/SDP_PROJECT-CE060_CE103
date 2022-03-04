import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TextField from "../Inputs/TextField";
import { createPlayList } from "../../redux/playListSlice/apiCalls";
import FileInput from "../Inputs/FileInput";
import Button from "../Button";
import axiosInstance from "../../redux/axiosInstance";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import defaultImg from "../../images/music.png";
import styles from "./styles.module.scss";

const PlaylistModel = ({ closeModel, playlist, isupdate }) => {
	const [data, setData] = useState({
		name: "",
		desc: "",
		img: "",
	});
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setData({ name: playlist.name, desc: playlist.desc, img: playlist.img });
	}, [playlist]);

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsFetching(true);
			if(isupdate){
				const url = process.env.REACT_APP_API_URL + `/playlists/edit/${playlist._id}`;
				const { data: res } = await axiosInstance.put(url, data);
				toast.success(res.message);
			}
			else{
				playlist.name = data.name;
				playlist.desc = data.desc;
				playlist.img = data.img;
				const url = process.env.REACT_APP_API_URL + `/playlists/c`;
				createPlayList(data, dispatch);
				const { data: res } = await axiosInstance.post(url, playlist);
				toast.success(res.message);
			}
			setIsFetching(false);
			window.location.reload();
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
	};

	return (
		<div className={styles.model_container}>
			<IconButton className={styles.close_btn} onClick={closeModel}>
				<CloseIcon />
			</IconButton>
			<div className={styles.form_container}>
				{isupdate ? <h1>Edit Details</h1> : <h1>Create PlayList</h1>}
				<div className={styles.input_container}>
					<TextField
						label="Name"
						name="name"
						maxlen={16}
						value={data.name}
						handleInputState={handleInputState}
						/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Description"
						name="desc"
						maxlen={64}
						value={data.desc}
						handleInputState={handleInputState}
					/>
				</div>
				<div className={styles.input_container}>
					<FileInput
						label="Choose Image"
						type="image"
						name="img"
						value={data.img === "" ? defaultImg : data.img}
						handleInputState={handleInputState}
					/>
				</div>
				<Button
					label="Submit"
					onClick={handleSubmit}
					isFetching={isFetching}
					style={{
						position: "absolute",
						bottom: "0",
						right: "0",
						margin: "1rem",
					}}
				/>
			</div>
		</div>
	);
};

export default PlaylistModel;
