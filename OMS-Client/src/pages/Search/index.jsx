import { Fragment, useState } from "react";
import axiosInstance from "../../redux/axiosInstance";
import Song from "../../components/Song";
import Playlist from "../../components/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import key from "../../key";

const apiurl = key.apiurl;

const Search = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const handleSearch = async ({ currentTarget: input }) => {
		setSearch(input.value);
		setResults({});
		try {
			setIsFetching(true);
			const url = apiurl + `/?search=${input.value}`;
			const { data } = await axiosInstance.get(url);
			setResults(data);
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder="Search for songs and playlists"
					maxLength={24}
					onChange={handleSearch}
					value={search}
					autoFocus
				/>
				<IconButton onClick={() => setSearch("")}>
					<ClearIcon />
				</IconButton>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{Object.keys(results).length !== 0 && (
				<div className={styles.results_container}>
						{results.songs.length !== 0 && (
						<div>
							<h1>Songs</h1>
							<div className={styles.songs_container}>
								<div className={styles.left}>
									{/* <span>#</span> */}
									<p>Title</p>
								</div>
								<div className={styles.center}>
									<p>Artist</p>
								</div>
								<div className={styles.right}>
									<AccessTimeIcon />
								</div>
								<div className={styles.underline}></div>
								{results.songs.map((song) => (
									<Fragment key={song._id}>
										<Song song={song} />
									</Fragment>
								))}
							</div>
						</div>
						)}
					{results.playlists.length !== 0 && (
						<div>
							<h1>PlayLists</h1>
							<div className={styles.underline}></div>
							<div className={styles.playlists_container}>
								<Playlist playlists={results.playlists} />
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
