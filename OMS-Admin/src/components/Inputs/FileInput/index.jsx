import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import storage from "../../../firebase";
import Button from "../../Button";
import styles from "./styles.module.scss";
import BackupIcon from "@mui/icons-material/Backup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FileInput = ({
	name,
	label,
	value,
	icon,
	type,
	handleInputState,
	uploadfeedback,
	...rest
}) => {
	const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false);
	
	const handleUpload = () => {
		setProgressShow(true);
		const d = new Date();
		const fileName = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + "_" 
						+ d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds() + "_" + value.name;
		const storageRef = ref(
			storage,
			type === "audio" ? `/audio/${fileName}` : `/images/${fileName}`
		);
		const uploadTask = uploadBytesResumable(storageRef, value);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploaded = Math.floor(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(uploaded);
			},
			(error) => {
				console.log(error);
				toast.error("An error occured while uploading!");
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					handleInputState((type === "audio") ? "song" : "img", url);
					uploadfeedback(true);
					// handleInputState(name, "s");
					if (type === "audio") {
						const audio = new Audio(url);
						audio.addEventListener(
							"loadedmetadata",
							() => {
								const duration = Math.floor(audio.duration);
								handleInputState("duration", duration);
								console.log("~" + duration);
								// handleInputState("duration", 0);
							},
							false
						);
					}
				});
			}
		);
	};

	return (
		<div className={styles.container}>
			<input
				name={name}
				type="file"
				accept = {
					(type === "image" ? "image/png, image/gif, image/jpeg" : "audio/mp3, audio/wav")
				}
				ref={inputRef}
				onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
				// onChange={(e) => handleInputState(name, "s")}
				vlaue={value}
				{...rest}
			/>
			<Button
				style={{
					width: "15rem",
					border: "1px solid black",
					background: "transparent",
				}}
				onClick={() => inputRef.current.click()}
				label={label}
			/>
			{type === "image" && value && (
				<img
					src={typeof value === "string" ? value : URL.createObjectURL(value)}
					alt={type}
				/>
			)}
			{type === "audio" && value && (
				<audio
					src={typeof value === "string" ? value : URL.createObjectURL(value)}
					controls
				/>
			)}
			{value !== null && !progressShow && typeof value !== "string" && (
				<Button
					onClick={handleUpload}
					startIcon={<BackupIcon />}
					label="Upload"
					style={{ width: "11rem" }}
				/>
			)}
			{progressShow && progress < 100 && (
				<div className={styles.progress_container}>
					<CircularProgress
						className={styles.progress}
						variant="determinate"
						value={progress}
					/>
					<p>{progress}%</p>
				</div>
			)}
			{progress === 100 && (
				<div className={styles.progress_container}>
					<CheckCircleIcon className={styles.success} />
				</div>
			)}
		</div>
	);
};

export default FileInput;
