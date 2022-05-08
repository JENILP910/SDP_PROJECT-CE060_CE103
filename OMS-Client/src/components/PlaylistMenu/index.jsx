import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSongToPlaylist, removeSongFromPlaylist } from "../../redux/playListSlice/apiCalls";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./styles.module.scss";

const PlaylistMenu = ({ playlist, song, handleRemoveSongAck, closeMenu }) => {
	const { playlists } = useSelector((state) => state.playlists);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleAddToPlaylist = (playlistId, songId) => {
		console.log(playlistId);
		const payload = { playlistId, songId };
		addSongToPlaylist(payload, dispatch);
	};
	
	const handleRemoveSong = async (songId) => {
		// console.log("hereeee");
		
		const payload = { playlistId: playlist._id, songId };
		const res = await removeSongFromPlaylist(payload, dispatch);
		!res && handleRemoveSongAck(songId);
	};
	
	// console.log(playlist);
	// console.log(playlists[0].name);
	// console.log(playlists[0]._id);
	return (
		<ClickAwayListener onClickAway={closeMenu}>
			<div className={styles.menu} onClick={closeMenu}>
				<div className={styles.playlist_option}>
					<p>Add to Playlist</p>
					<Fragment>
						<ArrowRightIcon />
						<div className={styles.playlists}>
							{playlists.map((playlist) => (	
								<div
									className={styles.option}
									onClick={() => handleAddToPlaylist(playlist._id, song._id)}
									key={playlist._id}
								>
									<p>{playlist.name}</p>
								</div>
							))}
						</div>
					</Fragment>
				</div>
				{playlist && playlist.usrid === user._id && (
					<div
						className={styles.option}
						onClick={() => handleRemoveSong(song._id)}
					>
						{/* <p onClick={() => handleRemoveSong(song._id)}> */}
						<p>Remove from Playlist</p>
					</div>
				)}
				{/* <div className={styles.option}>
					<p>Go to Artist</p>
				</div> */}
				{/* {(
				<div className={styles.option}>
					<p>Remove From Playlist</p>
				</div>
				)} */}
				<div className={styles.option}>
					<p>Share</p>
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default PlaylistMenu;
