import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";
// import playlistimg from "../../images/rock.jpg";

// const firstPlaylists = [
// 	{_id: 1, img: playlistimg, name: "Top Songs", desc: "By ABCD"}
// ]

const Library = () => {
	const { playlists } = useSelector((state) => state.playlists);
	const { likes } = useSelector((state) => state.likes);
	return (
		<div className={styles.container}>
			<h1>Playlists</h1>
			<div className={styles.playlists_container}>
				<Link to="/collection/tracks">
					<div className={styles.liked_songs}>
						<h1>Liked Songs</h1>
						<p> {likes + " Liked Songs"} </p>
					</div>
				</Link>
				<Playlist playlists={playlists} />
			</div>
		</div>
	);
};

export default Library;
