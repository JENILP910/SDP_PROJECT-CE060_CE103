import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Playlist = ({ playlists }) => {
	return (
		<Fragment>
			{playlists.map((playlist) => (
				<Link key={playlist._id} to={`/playlist/${playlist._id}`}>
					<div className={styles.playlist}>
						{playlist.img === "" ? (
							<img
								src="../../images/playlistimg/MusicPlaylist.jpg"
								alt={playlist.name}
								style={{ background: "#919496" }}
							/>
						) : (
							<img src = {"../images/playlistimg/" + playlist.img} alt={playlist.name} />
						)}
						<p>{playlist.name}</p>
						<span>By {playlist.usrnm}</span>
						{/* {playlist.img} */}
					</div>
				</Link>
			))}
		</Fragment>
	);
};

export default Playlist;
