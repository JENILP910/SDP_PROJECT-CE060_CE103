import { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createSong, updateSong } from "../../../redux/songsSlice/apiCalls";
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import FileInput from "../../Inputs/FileInput";
import Button from "../../Button";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Paper } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ImageIcon from "@mui/icons-material/Image";
import styles from "./styles.module.scss";

const SongForm = () => {
	const [data, setData] = useState({
		name: "",
		artist: ["aa", "bb", ""],
		img: null,
		song: null,
		duration: 0,
	});
	const [errors, setErrors] = useState({ name: "", artist: "" });
	const { songs, createSongProgress, updateSongProgress } = useSelector(
		(state) => state.songs
	);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const song = songs.filter((song) => song._id === id);
		if (id !== "new" && song[0]) {
			setData({
				name: song[0].name,
				artist: song[0].artist,
				song: song[0].song,
				img: song[0].img,
			});
		}
	}, [id, songs]);

	const schema = {
		name: Joi.string().required().label("Name"),
		artist: Joi.array().items(Joi.string()).required().label("Artist"),
		// artist: Joi.string().required().label("Artist"),
		// song: Joi.string().required().label("Song"),
		// img: Joi.string().required().label("Image"),
		song: Joi.any().label("Song"),
		img: Joi.any().label("Image"),
		// duration: Joi.number().required(),
		duration: Joi.number(),
	};

	const handleInputState = (name, value) => {
		console.log("called");
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		setErrors((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error } = Joi.object(schema).validate(data);
		data.song = "s";
		data.img = "i";
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
			toast.error(error.message);
		}
	};

	const Artist = ({data, handleInputState, handleErrorState}) => {
		const [adata, setaData] = useState({
			ad0: data.artist[0],
			ad1: data.artist[1],
			ad2: data.artist[2],
		});
		// const [adata, adispatch] = useReducer();

		const [ a0, setA0 ] = useState(1);
		const [ a1, setA1 ] = useState(false);
		const [ a2, setA2 ] = useState(false);

		const schema = {
			ad0: Joi.string().required().label("ad0"),
			ad1: Joi.string().label("ad1"),
			ad2: Joi.string().label("ad2"),
		};

		const handleInStat = (name, value) => {
			console.log("called");
			setaData((prev) => ({ ...prev, [name]: value }));
			handleInputState("artist", adata);
			console.log(adata);
		};
		
		const inc = ((k, i, j) => {
			console.log(k)
			if(k < 3){
				setA0(a0 + 1);
				i ? setA2(true) : setA1(true);
			}
		})
		
		const dec = ((seta) => {
			console.log(a0)
			seta(false);
			setA0(a0 - 1);
		})

		useEffect(() => {
			console.log(data);
			if(data.artist[1] !== ""){
				setA0(2);
				setA1(true);
				if(data.artist[2] !==""){
					setA0(3);
					setA2(true);
				}
			}
		},[data])
		
		return (
			<div className={styles.multi_artist}>
				<div>
					<TextField
						name="artist"
						label="Artist Name1"
						handleInputState={handleInStat}
						required={true}
						value={adata.ad0}
						handleErrorState={handleErrorState}
						schema={schema.ad0}
						error={errors.artist}
					/>
				</div>
				{a0 < 3 &&
					<IconButton className={styles.add_btn} onClick={() => { inc(a0, a1)}}>
						<AddIcon />
					</IconButton>
				}

				{a1 &&
					<div className={styles.artista}>
						<TextField
							name="artist"
							label="Artist Name2"
							handleInputState={handleInStat}
							required={true}
							value={adata.ad1}
							handleErrorState={handleErrorState}
							schema={schema.ad1}
							// error={errors.artist}
						/>
						<IconButton className={styles.close_btn} onClick={() => {dec(setA1)}}>
							<CloseIcon />
						</IconButton>
					</div>
				}
				{a2 &&
					<div className={styles.artista}>
					<TextField
						name="artist"
						label="Artist Name3"
						handleInputState={handleInStat}
						required={true}
						value={adata.ad2}
						handleErrorState={handleErrorState}
						schema={schema.ad2}
						// error={errors.artist}
					/>
					<IconButton className={styles.close_btn} onClick={() => {dec(setA2)}}>
						<CloseIcon />
					</IconButton>
				</div>
				}
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Add New Song" : "Edit Song"} <MusicNoteIcon />
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							name="name"
							label="Enter song name"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							schema={schema.name}
							error={errors.name}
							value={data.name}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						{/* <TextField
							name="artist"
							label="Artist Name"
							handleInputState={handleInputState}
							required={true}
							value={data.artist}
							handleErrorState={handleErrorState}
							schema={schema.artist}
							error={errors.artist}
						/> */}
						<Artist data={data}
								handleInputState={handleInputState}
								handleErrorState={handleErrorState}
						/>
					</div>
					<div className={styles.file_container}>
						<FileInput
							label="Choose song"
							icon={<MusicNoteIcon />}
							type="audio"
							name="song"
							handleInputState={handleInputState}
							value={data.song}
						/>
					</div>
					<div className={styles.file_container}>
						<FileInput
							label="Choose image"
							icon={<ImageIcon />}
							type="image"
							name="img"
							value={data.img}
							handleInputState={handleInputState}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Submit" : "Update"}
						isFetching={id === "new" ? createSongProgress : updateSongProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default SongForm;
