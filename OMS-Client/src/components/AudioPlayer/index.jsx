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
import sng from "./defsong";

const AudioPlayer = () => {
	const [trackIndex, setTrackIndex] = useState(0);

	const [trackProgress, setTrackProgress] = useState(0);
	// const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const { currentSong } = useSelector((state) => state.audioPlayer);
	// const { user, likeSongProgress } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	// const { name, artist, song, img, duration } = sng[0]; 
	const { song } = sng[trackIndex];

	// const audioRef = useRef(new Audio(currentSong.song));
	// const audioRef = useRef(new Audio(`../songs/OnAndOn.mp3`));
	const audioRef = useRef(new Audio(song));
	const intervalRef = useRef();
	const isReady = useRef(false);

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
				dispatch(setCurrentSong({ ...currentSong, action: "pause" }));
			} else if (audioRef) {
				setTrackProgress(audioRef.current.currentTime);
				// audioRef.current.duration && setDuration(audioRef.current.duration);
			} else {
				setTrackProgress(0);
			}
			// console.log(duration);
		}, [1000]);
	};
	
	const onScrub = (value) => {
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		if (!isPlaying){
			setIsPlaying(true);
			dispatch(setCurrentSong({ ...currentSong, action: "play" }));
		}
		
		startTimer();
	};
	
	const toPrevTrack = () => {
	if (trackIndex - 1 < 0) 
		setTrackIndex(sng.length - 1);
	else 
		setTrackIndex(trackIndex - 1);
	};

	const toNextTrack = () => {
		if (trackIndex < sng.length - 1) 
			setTrackIndex(trackIndex + 1);
		else 
			setTrackIndex(0);
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
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			audioRef.current.pause();
		}
	}, [currentSong, isPlaying]);
	// }, [currentSong]);

	// useEffect(() => {
	// 	currentSong.action === "play" && startTimer();
	// });

	useEffect(() => {
		audioRef.current.pause();

		audioRef.current = new Audio(song);
		// audioRef.current = new Audio(audioSrc);
		setTrackProgress(audioRef.current.currentTime);

		if (isReady.current) {
			audioRef.current.play();
			setIsPlaying(true);
			startTimer();
		} else {
			isReady.current = true;
		}
	}, [trackIndex]);

	useEffect(() => {
		return () => {
			dispatch(setCurrentSong({ ...currentSong, action: "pause" }))
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		};
	}, []);
	
	return (
		<div className={styles.audio_player}>
			<div className={styles.left}>
				<img src={"../images/songsimg/" + currentSong.song.img} alt="song_img" />
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
					<p>{Math.floor(trackProgress)}</p>
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
					<p>{duration ? Math.floor(duration) : 0}</p>
				</div>
			</div>
			<div className={styles.right}>
				<Like songId={currentSong.song._id} />
			</div>
		</div>
	);
};

export default AudioPlayer;
