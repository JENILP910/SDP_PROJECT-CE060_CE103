import { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PlaylistModel from "../../components/PlaylistModel";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import logo from "../../images/music_logo.png";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";

const Sidebar = () => {
	const { playlists, getPlayListProgress, createPlayListProgress } = useSelector((state) => state.playlists);
	const { user } = useSelector((state) => state.auth);
	const [model, setModel] = useState(false);
	const playlist = {
		name: "My Playlist #",
		desc: "",
		songs: [],
		img: "",
		usrid: user._id + "",
		usrnm: user.name + "",
	}

	return (
		<div className={styles.container}>
			<img className={styles.logo_img} src={logo} alt="logo" />
			<NavLink
				to="/home"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<HomeIcon />
				<span>Home</span>
			</NavLink>
			<NavLink
				to="/search"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<SearchIcon />
				<span>Search</span>
			</NavLink>
			<NavLink
				to="/collection/playlists"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<LibraryMusicIcon />
				<span>Your Library</span>
			</NavLink>
			<div
				className={styles.create_playlist_btn}
				onClick={() => setModel(true)}
			>
				<AddIcon />
				<span>Create Playlist</span>
			</div>
			<NavLink
				to="/collection/tracks"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<img src={likeImg} alt="jfo" />
				<span>Liked Songs</span>
			</NavLink>
			<div className={styles.underline}></div>

			{/* <div className={styles.playlist}> */}
			{getPlayListProgress || createPlayListProgress ? (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="3rem" />
				</div>
			) : (
				<Fragment>
					<div className={styles.playlist}>
					{playlists.map((playlist) => (
						<NavLink
							key={playlist._id}
							to={`/playlist/${playlist._id}`}
							activeClassName={styles.active_link}
							className={styles.playlist_link}
						>
							{playlist.name}
						</NavLink>
					))}
					</div>	
				</Fragment>
			)}
			{/* </div> */}
			{model && (
				<PlaylistModel
					closeModel={() => setModel(false)}
					playlist={playlist}
					isupdate = {false}
				/>
			)}
		</div>
	);
};

export default Sidebar;
