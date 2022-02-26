import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { likeSong, islikeSong } from "../../redux/userSlice/apiCalls";
import { likeSong } from "../../redux/userSlice/apiCalls";
import { IconButton, CircularProgress } from "@mui/material";
// import { useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";
// import { useEffect } from "react";

const Like = ({ songId }) => {
	const { user, likeSongProgress } = useSelector((state) => state.user);
	const [progress, setProgress] = useState(false);
	const [liked, setlike] = useState(false);
	const dispatch = useDispatch();
	// let initv = true;
	
	// const init = () => {
	// 	console.log("Pres")
	// 	const res = islikeSong(songId + "/" + user._id, dispatch);
	// 	setlike(res);
	// 	// initv = false
	// 	return
	// 	// res ? setlike(!liked) : setlike(liked)
	// }
	// // if(initv)
	// // 	init();

	// useEffect(()=>{
	// 	init();
	// },[])
	
	const handleLikeSong = async (songId) => {
		console.log(user);
		setProgress(true);
		const res = await likeSong(songId + "/" + user._id, dispatch);
		res ? setlike(!liked) : setlike(liked)
		// Toggle((await likeSong(songId + "/" + user._id, dispatch)).toString)
		setProgress(false);
		// (user.likedSongs.indexOf(songId) === -1) ? setlike(false) : setlike(true);
	
		// (user && user.likedSongs.indexOf(songId) === -1)
		// user.likedSongs.indexOf(songId) === -1
	};

	return (
		<IconButton
			className={styles.like_btn}
			// onLoad = {() => init()}
			onClick={() => handleLikeSong(songId)}
		>
			{likeSongProgress && progress ? (
				<CircularProgress style={{ color: "#1ed760" }} size="2rem" />
			) : (
				<Fragment>
					{(user && user.likedSongs.indexOf(songId) === -1) ? (
						<FavoriteBorderIcon className={styles.like_outlined} />
					) : (
						<FavoriteIcon className={styles.like_filled} />
					)}
				</Fragment>
			)}
		</IconButton>
	);
};

export default Like;
