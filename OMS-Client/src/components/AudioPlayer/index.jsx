import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong } from "../../redux/audioPlayer";
import Like from "../Like";
import { IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "./styles.module.scss";

const AudioPlayer = ({ currentSongs}) => {
	
	const [trackIndex, setTrackIndex] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const { currentSong } = useSelector((state) => state.audioPlayer);
	const [currSong, setCurrSong] = useState(currentSong.song.song);
	const dispatch = useDispatch();

	const audioRef = useRef(new Audio(currSong));
	const intervalRef = useRef();
	// const isReady = useRef(false);
// console.log();
	const { duration } = audioRef.current;

	const currentPercentage = duration
		? `${(trackProgress / duration) * 100}%`
		: "0%";
	const trackStyling = `
	-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

	const startTimer = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (currentSong && audioRef && audioRef.current.ended) {
				// toNextTrack();
				// dispatch(setCurrentSong({ ...currentSong, action: "pause" }));
			} else if (audioRef) {
				setTrackProgress(audioRef.current.currentTime);
				// audioRef.current.duration && setDuration(audioRef.current.duration);
			} else {
				setTrackProgress(0);
			}
			// console.log(duration);
		}, [100]);
	};
	
	const onScrub = (value) => {
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		intervalRef.current = audioRef.current.currentTime;
		setTrackProgress(audioRef.current.currentTime);
		// setIsPlaying(false);
	};

	const onScrubEnd = () => {
		if (!isPlaying){
			setIsPlaying(true);
			dispatch(setCurrentSong({ ...currentSong, action: "play" }));
		}

		startTimer();
	};
	
	const toPrevTrack = () => {
	// if (trackIndex - 1 < 0) 
	// 	setTrackIndex(sng.length - 1);
	// else 
	// 	setTrackIndex(trackIndex - 1);

	setIsPlaying(false);
	audioRef.current.pause();
	// const numOfSongs = currentSong.playlist.length - 1;
	if(trackIndex - 1 < 0)
		setTrackIndex(currentSong.playlist.length-1);
	else
		setTrackIndex(trackIndex-1);
	audioRef.current = new Audio(currentSong.playlist[trackIndex].song);
	setCurrSong(currentSong.playlist[trackIndex]);
	// audioRef.current.play();
	
	console.log(trackIndex);
	
	};

	const toNextTrack = () => {
		// 	if (trackIndex < sng.length - 1) 
		// 		setTrackIndex(trackIndex + 1);
		// 	else 
		// 		setTrackIndex(0);

		
		setIsPlaying(false);
		audioRef.current.pause();
		const numOfSongs = currentSong.playlist.length - 1;
		if(trackIndex + 1 > numOfSongs)
			setTrackIndex(0);
		else
			setTrackIndex(trackIndex+1);
		audioRef.current = new Audio(currentSong.playlist[trackIndex].song);
		setCurrSong(currentSong.playlist[trackIndex]);
		// audioRef.current.play();
		
		console.log(trackIndex);
		// console.log(numOfSongs);

	};

	const handleActions = () => {
		setIsPlaying(true);
		// audioRef.current.pause();
		// console.log(audioRef);
		// console.log(audioRef.current.error);
		currentSong.action === "play"
		? setIsPlaying(false)
		: setIsPlaying(true);
		currentSong.action === "play"
		? dispatch(setCurrentSong({ ...currentSong, action: "pause" }))
		: dispatch(setCurrentSong({ ...currentSong, action: "play" }));
	};

	useEffect(() => {
		// if (currentSong.action === "play") {
		if(audioRef.current != null){
			if (isPlaying) {
				audioRef.current.play();
				startTimer();
			} else {
				audioRef.current.pause();
			}
		}
	}, [isPlaying]);
	
	useEffect(() => {
		currentSong.action === "play" && startTimer();
	});

	// useEffect(() => {
	// 	console.log("in trackIndex");

	// 	audioRef.current.pause();
	// 	// audioRef.current = new Audio("https://firebasestorage.googleapis.com/v0/b/online-music-streaming-a-486c7.appspot.com/o/audio%2F1646454828077Hypnotic.mp3?alt=media&token=f5b31412-5d93-46a7-a1c0-5d0cb9f4af26");
	// 	// audioRef.current = new Audio(currentSong.song.song);
	// 	audioRef.current = new Audio(currSong);
	// 	setTrackIndex(currentSong.sId);
	// 	setTrackProgress(audioRef.current.currentTime);

	// 	if (isReady.current) {
	// 		audioRef.current.play();
	// 		setIsPlaying(true);
	// 		startTimer();
	// 	} else {
	// 		isReady.current = true;
	// 	}
	// 	// console.log(trackIndex);
	// }, []);
	
	useEffect(() => {
		return () => {
			dispatch(setCurrentSong({ ...currentSong, action: "pause" }));
			audioRef.current.pause();
			clearInterval(intervalRef.current);
			console.log("End Calledd");
		};
	}, [setCurrentSong, dispatch]);
	
	return (
		<div className={styles.audio_player}>
			<div className={styles.left}>
				{/* <img src={"../images/songsimg/" + currentSong.song.img} alt="song_img" /> */}
				<img src={currentSong.song.img ? ((currentSong.song.img).indexOf("http") ? "../../images/songsimg/"
						+ currentSong.song.img : currentSong.song.img) : "../default.gif"} alt={currentSong.song.name} />
				<div className={styles.song_info}>
					<p className={styles.song_name}>{currentSong.song.name}</p>
					<p className={styles.song_artist}>{currentSong.song.artist}</p>
				</div>
			</div>
			<div className={styles.center}>
				<div className={styles.audio_controls}>
					<IconButton className={styles.prev} onClick={toPrevTrack}>
						<SkipPreviousIcon />
					</IconButton>
					<IconButton className={styles.play} onClick={handleActions}>
						{currentSong.action === "play" ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>
					<IconButton className={styles.next} onClick={toNextTrack} >
						<SkipNextIcon />
					</IconButton>
				</div>
				<div className={styles.progress_container}>
					<p>{Math.floor(trackProgress) > 60 ? (parseInt(Math.floor(trackProgress)/60) + ":" + Math.floor(trackProgress)%60) : "0:" + Math.floor(trackProgress)}</p>
					<input
						type="range"
						value={trackProgress}
						step="1"
						min="0"
						onChange={(e) => onScrub(e.target.value)}
						onKeyUp={onScrubEnd}

						max={duration ? duration : 0}
						className={styles.progress}
						style={{ background: trackStyling }}
					/>
					<audio src={currentSong.song.song} ref={audioRef}></audio>
					<p>{duration
						? (Math.floor(duration) > 60 ? (parseInt(Math.floor(duration)/60) + ":" + Math.floor(duration)%60) 
						: Math.floor(duration)) : 0}</p>
				</div>
			</div>
			<div className={styles.right}>
				<Like songId={currentSong.song._id} />
			</div>
		</div>
	);
};

export default AudioPlayer;
