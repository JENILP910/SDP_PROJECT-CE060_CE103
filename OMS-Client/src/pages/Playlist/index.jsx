import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
import { deletePlayList, removeSongFromPlaylist } from "../../redux/playListSlice/apiCalls";
// import { setCurrentPlayList, setCurrentSong } from "../../redux/audioPlayer";
import { setCurrentSong } from "../../redux/audioPlayer";
import Song from "../../components/Song";
import PlaylistModel from "../../components/PlaylistModel";
import { IconButton, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

const Playlist = () => {
	const [playlist, setPlaylist] = useState({});
	const [songs, setSongs] = useState([]);
	const [model, setModel] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const { user } = useSelector((state) => state.auth);
	// const { currentSongs } = useSelector((state) => state.audioPlayer);
	const { currentSong } = useSelector((state) => state.audioPlayer);
	const dispatch = useDispatch();
	const { id } = useParams();

	const history = useHistory();

	const getPlaylistSongs = async (id) => {
		// console.log("Feteching...");
		// console.log(data.data.playlist);
		try {
			setIsFetching(true);
			const url = process.env.REACT_APP_API_URL + "/playlists/" + id;
			const { data } = await axiosInstance.get(url);
			setPlaylist(data.data.playlist);
			console.log(data.data.playlist.name);
			console.log(data.data.songs);
			setSongs(data.data.songs);
			setIsFetching(false);
		} catch (error) {
			setIsFetching(false);
			console.log(error);
		}
	};

	const handleDeletePlaylist = async () => {
		const res = await deletePlayList(playlist._id, dispatch);
		if (res) history.push("/home");
	};

	const handleRemoveSong = async (songId) => {
		console.log(songId);
		const originalSongs = [...songs];
		const payload = { playlistId: playlist._id, songId };
		const filterSongs = originalSongs.filter((song) => song._id !== songId);
		setSongs(filterSongs);
		const res = await removeSongFromPlaylist(payload, dispatch);
		!res && setSongs(originalSongs);
	};

	const handleOnClick = async (songId) => {
		// console.log("here->  ");
		// console.log(currentSongs);
		console.log("click here--->  ");
		// console.log(songs);
		const song = songs.filter((song) => song._id === songId);
		const sIndex = songs.findIndex((song) => song._id === songId);
		console.log(song[0]);

		// const payloadl = {
		// 	song: songs,
		// 	action: "active",
		// };
		// setCurrentPlayList(payloadl);
		if (currentSong && currentSong.action === "play") {
			const payload = {
				playlist: songs,
				song: song[0],
				sId: sIndex,
				action: "play",
			};
			dispatch(setCurrentSong(payload));
		} else {
			const payload = {
				playlist: songs,
				song: song[0],
				sId: sIndex,
				action: "play",
			};
			dispatch(setCurrentSong(payload));
		}
	}

	useEffect(() => {
		getPlaylistSongs(id);
	}, [id]);

	return (
		<div className={styles.container}>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{!isFetching && (
				<Fragment>
					<div className={styles.head}>
						<div className={styles.head_gradient}></div>
						{playlist.img === "" ? (
							<img
								src="../../images/playlistimg/PlaylistP.jpg"
								alt={playlist.name}
								style={{ background: "#919496" }}
							/>
						) : (
							<img 
								src={playlist.img ? ((playlist.img).indexOf("http") ? "../images/playlistimg/"
								+ playlist.img : playlist.img) : "../default.gif"} alt={currentSong.song.name}
								// src={"../images/playlistimg/" + playlist.img} alt={playlist.name} 
							/>
							)}

						<div className={styles.playlist_info}>
							<p>Playlist</p>
							<h1>{playlist.name}</h1>
							<span>- {playlist.usrnm}</span>
						</div>
						{playlist.usrid === user._id && (
							<div className={styles.actions_container}>
								<IconButton onClick={() => setModel(true)}>
									<EditIcon />
								</IconButton>
								<IconButton onClick={handleDeletePlaylist}>
									<DeleteIcon />
								</IconButton>
							</div>
						)}
					</div>
					<div className={styles.body}>
						<div className={styles.body_nav}>
							<div className={styles.left}>
								<span>#</span>
								<p>Title</p>
							</div>
							<div className={styles.center}>
								<p>Artist</p>
							</div>
							<div className={styles.right}>
								<AccessTimeIcon />
							</div>
						</div>
						{songs.map((song) => (
							<Fragment key={song._id}>
								<Song
									song={song}
									playlist={playlist}
									handleRemoveSong={handleRemoveSong}
									handleOnClick={handleOnClick}
								/>
							</Fragment>
						))}
					</div>
					{model && (
						<PlaylistModel
							closeModel={() => setModel(false)}
							playlist={playlist}
							isupdate = {true}
						/>
					)}
				</Fragment>
			)}
		</div>
	);
};

export default Playlist;
