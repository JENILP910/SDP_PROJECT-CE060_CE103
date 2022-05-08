// import { useState, useReducer, useEffect } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createSong, updateSong } from "../../../redux/songsSlice/apiCalls";
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import FileInput from "../../Inputs/FileInput";
import Button from "../../Button";
// import RadioCust from "../../Inputs/Radio";
// import { Radio, RadioGroup } from "@mui/material";
// import { IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import AddIcon from "@mui/icons-material/Add";
import { Paper } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import Select from "../../Inputs/Select";
import ImageIcon from "@mui/icons-material/Image";
import styles from "./styles.module.scss";
import Artist from "./Artist";
import DateField from "./DateField";
import Genre from "./Genre";
import AlbPly from "./AlbumPlaylist";
import Company from "./Company";


const SongForm = () => {
	const [data, setData] = useState({
		name: "",
		movie: "",
		genre: "pop",
		artist: ["", "", ""],
		isPlaylist: "Playlist",
		company: "",
		song: null,
		img: null,
		date: ["", "01", ""],
		duration: 0,
	});
	const [errors, setErrors] = useState({ name: "", movie: "", artist: "", song: "" });
	const { songs, createSongProgress, updateSongProgress } = useSelector(
		(state) => state.songs
	);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const [sUp, setSUp] = useState(false);
	const [imgUp, setIMGUp] = useState(false);
	
	useEffect(() => {
		const song = songs.filter((song) => song._id === id);
		if (id !== "new" && song[0]) {
			setData({
				name: song[0].name,
				movie: song[0].movie,
				genre: song[0].genre,
				artist: song[0].artist,
				isPlaylist: song[0].isPlaylist,
				company: song[0].company,
				song: song[0].song,
				img: song[0].img,
				date: song[0].date,
			});
		}
	}, [id, songs]);

	const schema = {
		name: Joi.string().required().label("Name"),
		movie: Joi.string().label("Movie").allow(''),
		artist: Joi.array().items(Joi.string().allow('')).required().label("Artist"),
		genre: Joi.string().required().label("Genre"),
		isPlaylist: Joi.string().required().label("isPlaylist"),
		company: Joi.any().required().label("Company"),

		img: Joi.any().required().label("Image"),
		song: Joi.any().required().label("Song"),
		date: Joi.array().items(Joi.string()).required().label("Date"),
		duration: Joi.number(),
	};

	const handleInputState = (name, value) => {
		console.log("~called");
		console.log(name + " - " + value);
		// console.log(value);
		setData((prev) => ({ ...prev, [name]: value }));
		// console.log(data);
	};

	const handleErrorState = (name, value) => {
		setErrors((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(sUp);
		console.log(imgUp);
		// if(data.song == null || !sUp)
		// 	if(!sUp)
		// 		toast.error("Upload Song File!");
		// 	else
		// 		toast.error("Song File Is Required!!");
		// else if(data.img == null || !imgUp){
		// 	if(!imgUp)
		// 		toast.error("Upload Image File!");
		// 	else
		// 		toast.error("Image File Is Required!!");}
		// else{
			const { error } = Joi.object(schema).validate(data);
			// data.song = "s";
			// data.img = "i";
			if (!error) {
				if (id === "new") {
					const res = await createSong(data, dispatch);
					// console.log("Better");
					res && history.push("/songs");
				} else {
					const res = await updateSong(id, data, dispatch);
					res && history.push("/songs");
				}
			} else {
				// console.log(error);
				toast.error(error.message);
			}
		// }
	};
	////////////////////////////////////////////////////////////////////////////////////////////
	

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Add New Song" : "Edit Song"} <MusicNoteIcon />
				</h1>
				<form onSubmit={handleSubmit}>
					<div style={{display: "inline-block"}}>
						<div className={styles.input_container}>
							<TextField
								name="name"
								label="Enter Song Name"
								handleInputState={handleInputState}
								handleErrorState={handleErrorState}
								schema={schema.name}
								error={errors.name}
								value={data.name}
								required={true}
							/>
						</div>
						{/* <div className={styles.year_container}>
							<TextField
								name="year"
								label="Enter Year of Song"
								handleInputState={handleInputState}
								handleErrorState={handleErrorState}
								schema={schema.name}
								error={errors.name}
								value={data.name}
								required={true}
							/>
						</div> */}
						<div className={styles.input_container}>
							<TextField
								name="movie"
								label="Enter Movie Name"
								handleInputState={handleInputState}
								handleErrorState={handleErrorState}
								schema={schema.movie}
								error={errors.movie}
								value={data.movie}
								// required={true}
							/>
						</div>

						<Genre
							sGenre={data.genre}
							handleInputState={handleInputState}
						/>

						<DateField
							data={data.date}
							handleInputState={handleInputState}
						/>
						<Artist
							data={data}
							handleInputState={handleInputState}
						/>

						<AlbPly
							sdata={data.isPlaylist}
							handleInputState={handleInputState}
							/>

						<Company 
							cdata={data.company}
							handleInputState={handleInputState}

						/>

						<div className={styles.file_container}>
{/* {console.log(data)} */}

							<FileInput
								label="Choose song"
								icon={<MusicNoteIcon />}
								type="audio"
								name="song"
								handleInputState={handleInputState}
								value={data.song}
								uploadfeedback={setSUp}
							/>
						</div>
						{/* <div className="styles.input_container">
							
						</div> */}
						
						<div className={styles.file_container}>
							<FileInput
								label="Choose image"
								icon={<ImageIcon />}
								type="image"
								name="img"
								handleInputState={handleInputState}
								value={data.img}
								uploadfeedback={setIMGUp}
							/>
						</div>
						
						<div className={styles.submit_btn}>
							<Button
								type="submit"
								label={id === "new" ? "Submit" : "Update"}
								isFetching={id === "new" ? createSongProgress : updateSongProgress}
								// style={{ marginLeft: "auto" }}
							/>
						</div>
					</div>
				</form>
			</Paper>
		</div>
	);
};

export default SongForm;
