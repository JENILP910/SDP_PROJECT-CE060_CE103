import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSong } from "../../../redux/songsSlice/apiCalls";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

const SongTable = ({ songs }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	// const artists = [1, 2, 3];
	// const artists = songs.artist;
	// console.log(songs)
	// console.log(songs[0])
	// console.log(songs.artist)

	setTimeout(() => setLoading(false), 1000);

	const handleDelete = (id) => {
		deleteSong(id, dispatch);
	};

	const Artist = ({ artists }) => {
		let str = "";
		if(artists[1] != null && artists[1] !== ""){
			str = ", " + artists[1];
			if(artists[2] != null  && artists[2] !== "")
				str = ", " + artists[1] + ", " + artists[2];
		}
		
		return (
			<div>
				{artists[0] + str}
				{/* {str} */}
			</div>
		)
	}

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Image</TableCell>
						<TableCell align="center">name</TableCell>
						<TableCell align="center">Artist</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				{loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="left">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
				)}
				{!loading && (
					<TableBody>
						{songs.length !== 0 &&
							songs.map((song, index) => (
								<TableRow key={song._id}>
									<TableCell align="center">
										{/* <img className={styles.song_img} src={song.img} alt="" /> */}
										<img className={styles.song_img} src={
											song.img ? ((song.img).indexOf("http") ? "../../images/songsimg/" + song.img : song.img) : "../default.gif"
											} alt="" />
									</TableCell>
									<TableCell align="center">{song.name}</TableCell>
									{/* <TableCell align="center">{song.artist}</TableCell> */}
									<TableCell align="center">
										<Artist artists={song.artist} />
									</TableCell>
									<TableCell align="center">
										<Link to={`/songs/${song._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDelete(song._id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{songs.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default SongTable;
