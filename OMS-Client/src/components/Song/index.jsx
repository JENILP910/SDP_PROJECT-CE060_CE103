import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
//import { setCurrentSong } from "../../redux/audioPlayer";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";

const Song = ({ song, playlist, handleRemoveSong, handleOnClick }) => {
	const [menu, setMenu] = useState(false);
	const { currentSong } = useSelector((state) => state.audioPlayer);
	// const dispatch = useDispatch();

	const handleChange = () => {
		// console.log(song._id);
		// if (currentSong && currentSong.action === "play") {
		// 	const payload = {
		// 		song: song,
		// 		action: "play",
		// 	};
		// 	dispatch(setCurrentSong(payload));
		// } else {
		// 	const payload = {
		// 		song: song,
		// 		action: "play",
		// 	};
		// 	dispatch(setCurrentSong(payload));
		// }
		handleOnClick(song._id);
	};

	const Artist = ({ artists }) => {
		let str = "";
		if(artists[1] != null && artists[1] !== ""){
			str = ", " + artists[1];
			if(artists[2] != null && artists[2] !== "")
				str = ", " + artists[1] + ", " + artists[2];
		}
		
		return (
			<p>
				{artists[0]}
				{str}
			</p>
		)
	}

	return (
		<div className={styles.song_container}>
			<div className={styles.left}>
				{/* <IconButton onClick={handleChange} className={styles.play_btn}> */}
				<IconButton onClick={handleChange} className={styles.play_btn}>
					{currentSong &&
					currentSong.action === "play" &&
					currentSong.song._id === song._id ? (
						<PauseIcon />
							) : (
						<PlayArrowIcon />
					)}
				</IconButton>
				<img src={
					song.img ? ((song.img).indexOf("http") ? "../../images/songsimg/" + song.img : song.img) : "../default.gif"
					// "../images/songsimg/" + song.img
					} alt="song" />
				<p>{song.name}</p>
			</div>
			<div className={styles.center}>
				<Artist artists={song.artist}/>
				{/* <p>{song.artist[0]}</p> */}
			</div>
			<div className={styles.right}>
				<Like songId={song._id} />
				<p>{song.duration}</p>
				<IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
					<MoreHorizIcon />
				</IconButton>
				{menu && (
					<PlaylistMenu
						playlist = {playlist}
						song = {song}
						handleRemoveSongAck = {handleRemoveSong}
						closeMenu={() => setMenu(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default Song;
